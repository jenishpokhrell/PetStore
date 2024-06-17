using backend.Context;
using backend.Dto;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        //CRUD Operation

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] CreateUpdateProductDto dto)
        {
            var newProduct = new ProductEntity()
            {
                Brand = dto.Brand,
                Title = dto.Title,
            };

            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok("Product Saved Successfully");
        }

        //Read
        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> GetALlProducts()
        {
            var products = await _context.Products.OrderByDescending(q => q.UpdatedAt).ToListAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(q => q.Id == id);
            if(product is null)
            {
                return Ok("Product doesn't exist");
            }
            return Ok(product);
        }

        //Update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] long id, [FromBody] CreateUpdateProductDto updateDto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if(product is null)
            {
                return Ok("Product not found");
            }
            product.Title = updateDto.Title;
            product.Brand = updateDto.Brand;
            product.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok("Product Updated Sucessfully");
        }

        //Delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null)
            {
                return Ok("Product not found");
            }
            _context.Remove(product);
            await _context.SaveChangesAsync();
            return Ok("Product Deleted Successfully");
        }
    }
}
