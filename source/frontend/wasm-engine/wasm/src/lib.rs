use wasm_bindgen::prelude::*;
use serde_wasm_bindgen::from_value;
use lopdf::{Document, Object, Dictionary};

#[wasm_bindgen(js_name = processFiles)]
pub fn process_files(data: JsValue, operation: &str) -> Vec<u8> {
    let files: Vec<Vec<u8>> = from_value(data).unwrap_or_default();
    if files.is_empty() {
        return Vec::new();
    }

    match operation {
        "to-pdf" => to_pdf_internal(&files[0]),
        "merge-pdf" | "combine-pdf" => merge_files_internal(&files),
        "split-pdf" => {
            let mid = files.len() / 2;
            let (first_half, _) = files.split_at(mid);
            merge_files_internal(&first_half.to_vec())
        }
        "compress-pdf" => compress_files_internal(&files[0]),
        _ => Vec::new(),
    }
}

fn compress_files_internal(data: &[u8]) -> Vec<u8> {
    if let Ok(mut doc) = Document::load_mem(data) {
        doc.compress();
        let mut out = Vec::new();
        if doc.save_to(&mut out).is_ok() {
            return out;
        }
    }
    data.to_vec()
}

fn merge_files_internal(files: &Vec<Vec<u8>>) -> Vec<u8> {
    let mut target_doc = Document::with_version("1.5");
    let mut page_nodes = Vec::new();
    let mut max_id = 1;

    for data in files {
        if let Ok(mut source_doc) = Document::load_mem(data) {
            source_doc.renumber_objects_with(max_id);
            
            let pages = source_doc.get_pages();
            let mut page_indices: Vec<_> = pages.keys().collect();
            page_indices.sort();

            for &index in page_indices {
                if let Some(&page_id) = pages.get(&index) {
                    if let Ok(page_obj) = source_doc.get_object(page_id) {
                        let new_id = target_doc.add_object(page_obj.clone());
                        page_nodes.push(Object::Reference(new_id));
                    }
                }
            }

            for (id, object) in source_doc.objects {
                target_doc.objects.insert(id, object);
                if id.0 > max_id {
                    max_id = id.0;
                }
            }
            max_id = target_doc.max_id + 1;
        }
    }

    let mut pages_dict = Dictionary::new();
    pages_dict.set("Type", Object::Name(b"Pages".to_vec()));
    pages_dict.set("Count", Object::Integer(page_nodes.len() as i64));
    pages_dict.set("Kids", Object::Array(page_nodes));
    let pages_root_id = target_doc.add_object(pages_dict);
    let mut catalog_dict = Dictionary::new();
    catalog_dict.set("Type", Object::Name(b"Catalog".to_vec()));
    catalog_dict.set("Pages", Object::Reference(pages_root_id));
    let catalog_id = target_doc.add_object(catalog_dict);

    target_doc.trailer.set("Root", Object::Reference(catalog_id));

    let mut out = Vec::new();
    target_doc.save_to(&mut out).unwrap_or_default();
    out
}

fn to_pdf_internal(data: &[u8]) -> Vec<u8> {
    if data.starts_with(b"%PDF") {
        return data.to_vec();
    }

    merge_files_internal(&vec![data.to_vec()])
}
