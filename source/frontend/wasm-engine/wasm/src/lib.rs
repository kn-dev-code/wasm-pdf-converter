use wasm_bindgen::prelude::*;
use printpdf::{PdfDocument, Mm, Image, ImageTransform, ImageXObject};

#[wasm_bindgen(js_name = processFiles)]
pub fn process_files(data: &[u8], operation: &str) -> Vec<u8> {
    match operation {
        "to-pdf" => to_pdf(data),
        _ => data.to_vec(),
    }
}
fn to_pdf(data: &[u8]) -> Vec<u8> {
    let (doc, page1, layer1) = PdfDocument::new("BlinkFlow", Mm(210.0), Mm(297.0), "Layer 1");
    let current_layer = doc.get_page(page1).get_layer(layer1);

    if let Ok(dynamic_img) = image_crate::load_from_memory(data) {
        let rgba_img = dynamic_img.to_rgba8();
        let (width, height) = rgba_img.dimensions();
        let raw_pixels = rgba_img.into_raw();

        let image_x_object = ImageXObject {
            width: printpdf::Px(width as usize),
            height: printpdf::Px(height as usize),
            color_space: printpdf::ColorSpace::Rgba,
            bits_per_component: printpdf::ColorBits::Bit8,
            interpolate: true,
            image_data: raw_pixels,
            clipping_bbox: None,
            image_filter: None,
        };

        let print_image = Image::from(image_x_object);
        print_image.add_to_layer(current_layer, ImageTransform::default());
        
        return doc.save_to_bytes().unwrap_or_else(|_| data.to_vec());
    }

    data.to_vec()
}