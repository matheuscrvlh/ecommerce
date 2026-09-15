export type ProductBody = {
    sku: number 
    ean?: number 
    name: string 
    description?: string 
    short_description?: string 
    category_id?: number 
    brand_id?: number
    product_type: string 
    unit: number 
    is_active: boolean
    is_published: boolean
}