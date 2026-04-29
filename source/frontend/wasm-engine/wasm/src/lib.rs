use wasm_bindgen::prelude::*;
use serde_wasm_bindgen::from_value;
use printpdf::*;
use image_crate::imageops::FilterType;
use image_crate::GenericImageView;

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
        "compress-pdf" => compress_pdf_internal(&files[0]),
        _ => Vec::new(),
    }
}

fn merge_files_internal(files: &Vec<Vec<u8>>) -> Vec<u8> {
    let (doc, page1, layer1) = PdfDocument::new(
        "Blinkflow Document",
        Mm(210.0),
        Mm(297.0),
        "Layer 1"
    );

    for (index, data) in files.iter().enumerate() {
        let current_layer = if index == 0 {
            doc.get_page(page1).get_layer(layer1)
        } else {
            let (p, l) = doc.add_page(Mm(210.0), Mm(297.0), format!("Layer {}", index));
            doc.get_page(p).get_layer(l)
        };

        if let Ok(dynamic_img) = image_crate::load_from_memory(data) {
            let rgba_img = dynamic_img.to_rgba8();
            let (width, height) = rgba_img.dimensions();

            let image_x_object = ImageXObject {
                width: Px(width as usize),
                height: Px(height as usize),
                color_space: ColorSpace::Rgba,
                bits_per_component: ColorBits::Bit8,
                interpolate: true,
                image_data: rgba_img.into_raw(),
                clipping_bbox: None,
                image_filter: None,
            };
            let transform = ImageTransform {
                translate_x: Some(Mm(0.0)),
                translate_y: Some(Mm(0.0)),
                rotate: None,
                scale_x: Some(0.5),
                scale_y: Some(0.5),
                dpi: Some(300.0),
            };

            Image::from(image_x_object).add_to_layer(current_layer, transform);
        }
    }
    doc.save_to_bytes().unwrap()
}

fn to_pdf_internal(data: &[u8]) -> Vec<u8> {
    merge_files_internal(&vec![data.to_vec()])
}

fn compress_pdf_internal(data: &[u8]) -> Vec<u8> {
    let (doc, page1, layer1) = PdfDocument::new(
        "Blinkflow: Compressed",
        Mm(210.0),
        Mm(297.0),
        "Layer 1"
    );
    let current_layer = doc.get_page(page1).get_layer(layer1);

    if let Ok(dynamic_img) = image_crate::load_from_memory(data) {
        let (w, h) = dynamic_img.dimensions();
        let resized = dynamic_img.resize(w / 2, h / 2, FilterType::Lanczos3);
        let (new_w, new_h) = resized.dimensions();
        let rgba_data = resized.to_rgba8().into_raw();

        let image_x_object = ImageXObject {
            width: Px(new_w as usize),
            height: Px(new_h as usize),
            color_space: ColorSpace::Rgba,
            bits_per_component: ColorBits::Bit8,
            interpolate: true,
            image_data: rgba_data,
            clipping_bbox: None,
            image_filter: None,
        };
        let transform = ImageTransform {
            translate_x: Some(Mm(0.0)),
            translate_y: Some(Mm(0.0)),
            rotate: None,
            scale_x: Some(0.5), 
            scale_y: Some(0.5),
            dpi: Some(300.0), 
        };

        Image::from(image_x_object).add_to_layer(current_layer, transform);
    }
    doc.save_to_bytes().unwrap()
}
