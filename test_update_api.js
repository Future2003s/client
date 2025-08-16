// Script test để kiểm tra API update sản phẩm
// Chạy: node test_update_api.js

const testUpdateProduct = async () => {
  const productId = "e21f9b89-97da-444f-991a-052b5115b625";
  const updatePayload = {
    name: "Mật Ong Hoa Vải 435g",
    description: "",
    price: 380000,
    stock: 101,
    sku: "",
    categoryId: "",
    brandId: "",
    images: [],
    status: "ACTIVE",
  };

  try {
    console.log("Testing update product API...");
    console.log("Product ID:", productId);
    console.log("Payload:", JSON.stringify(updatePayload, null, 2));

    // Test 1: Gọi trực tiếp backend
    console.log("\n=== Test 1: Gọi trực tiếp backend ===");
    const backendResponse = await fetch(
      `http://localhost:8080/v1/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_ADMIN_TOKEN_HERE", // Thay thế bằng token thật
        },
        body: JSON.stringify(updatePayload),
      }
    );

    console.log("Backend Status:", backendResponse.status);
    console.log(
      "Backend Headers:",
      Object.fromEntries(backendResponse.headers.entries())
    );

    if (backendResponse.ok) {
      const backendData = await backendResponse.json();
      console.log("Backend Response:", JSON.stringify(backendData, null, 2));
    } else {
      const backendError = await backendResponse.text();
      console.log("Backend Error:", backendError);
    }

    // Test 2: Gọi frontend API route
    console.log("\n=== Test 2: Gọi frontend API route ===");
    const frontendResponse = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      }
    );

    console.log("Frontend Status:", frontendResponse.status);
    console.log(
      "Frontend Headers:",
      Object.fromEntries(frontendResponse.headers.entries())
    );

    if (frontendResponse.ok) {
      const frontendData = await frontendResponse.json();
      console.log("Frontend Response:", JSON.stringify(frontendData, null, 2));
    } else {
      const frontendError = await frontendResponse.text();
      console.log("Frontend Error:", frontendError);
    }
  } catch (error) {
    console.error("Error testing API:", error);
  }
};

// Chạy test
testUpdateProduct();
