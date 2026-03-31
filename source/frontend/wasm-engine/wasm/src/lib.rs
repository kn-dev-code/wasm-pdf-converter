use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_files(data: &[u8], operation: &str) -> Vec<u8>{

    match operation {
        "merge" => merge_pdf(data),
        "compress" => compress_pdf(data),
        "combine" => combine_pdf(data),
        "split_pdf" => split_pdf(data),
        "to_pdf" => to_pdf(data),
        _ => data.to_vec(),
    }
}

fn merge_pdf(data: &[u8]) -> Vec<u8> {
    data.to_vec()
}

fn compress_pdf(data: &[u8]) -> Vec<u8> {
   data.to_vec()
}

fn combine_pdf(data: &[u8]) -> Vec<u8> {
    data.to_vec()
}

fn split_pdf(data: &[u8]) -> Vec<u8> {
    data.to_vec()
}

fn  to_pdf(data: &[u8]) -> Vec<u8> {
    data.to_vec()
}