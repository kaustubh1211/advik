export default async function initProductsFile() {
    try {
      console.log("Checking if products.json is ready...");
      const response = await fetch('/api/product/page'); // Call your API
      const data = await response.json();
  
      if (data.success) {
        console.log("products.json file is ready.");
      } else {
        console.error("Failed to initialize products.json:", data.message);
      }
    } catch (error) {
      console.error("Error initializing products.json:", error);
    }
  }
  