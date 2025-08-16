# Hướng dẫn Debug API Orders

## Các lỗi đã được sửa:

### 1. **Lỗi đọc response body hai lần**

- **Vấn đề**: `proxyJson` function đọc response body, sau đó API route lại đọc lần nữa
- **Giải pháp**: Sửa `proxyJson` để chỉ đọc một lần và trả về response đã được xử lý

### 2. **Lỗi authentication**

- **Vấn đề**: Không có logging chi tiết cho authentication
- **Giải pháp**: Thêm logging cho auth header và response status

### 3. **Lỗi environment variables**

- **Vấn đề**: Không kiểm tra `NEXT_PUBLIC_API_END_POINT` có tồn tại không
- **Giải pháp**: Thêm validation cho environment variables

### 4. **Lỗi error handling**

- **Vấn đề**: Không có thông báo lỗi chi tiết
- **Giải pháp**: Thêm toast notifications và logging chi tiết

## Cách debug:

### 1. **Kiểm tra Environment Variables**

```bash
# Kiểm tra file .env.local
NEXT_PUBLIC_API_END_POINT=http://localhost:8080
```

### 2. **Test Backend Connection**

Truy cập: `http://localhost:3000/api/orders/test`

Response mong đợi:

```json
{
  "success": true,
  "status": 200,
  "data": { ... },
  "backendUrl": "http://localhost:8080/v1/api/orders"
}
```

### 3. **Kiểm tra Console Logs**

Mở Developer Tools (F12) và tìm các logs:

- `"Orders test API called"`
- `"Backend test result"`
- `"Orders API called with params"`
- `"Making request to:"`
- `"Auth header present:"`

### 4. **Các lỗi thường gặp:**

#### Lỗi 500 - Backend URL not configured

```json
{
  "message": "Backend URL not configured",
  "env": "development"
}
```

**Giải pháp**: Kiểm tra file `.env.local` có `NEXT_PUBLIC_API_END_POINT` không

#### Lỗi 401 - Unauthenticated

```json
{
  "message": "Unauthenticated"
}
```

**Giải pháp**:

- Đăng nhập vào hệ thống
- Kiểm tra session token trong cookies
- Kiểm tra backend có yêu cầu authentication không

#### Lỗi 404 - Not Found

```json
{
  "message": "Internal Error"
}
```

**Giải pháp**:

- Kiểm tra backend có chạy không (port 8080)
- Kiểm tra endpoint `/v1/api/orders` có tồn tại không

#### Lỗi Network

```json
{
  "message": "Test failed",
  "error": "fetch failed"
}
```

**Giải pháp**:

- Kiểm tra backend có chạy không
- Kiểm tra firewall/network
- Kiểm tra CORS configuration

## Backend Endpoints cần thiết:

### Orders API:

```
GET /v1/api/orders?page=0&size=10
PUT /v1/api/orders/{id}
POST /v1/api/orders
GET /v1/api/orders/{id}/history
```

### Response Format mong đợi:

```json
{
  "content": [
    {
      "id": "1",
      "customerName": "Nguyễn Văn A",
      "totalAmount": 150000,
      "status": "PENDING",
      "createdAt": "2024-01-01T00:00:00Z",
      "items": [
        {
          "id": "1",
          "productName": "Sản phẩm 1",
          "price": 75000,
          "quantity": 2
        }
      ]
    }
  ],
  "totalPages": 1,
  "page": 0,
  "size": 10
}
```

## Cách test từng bước:

### Bước 1: Test Backend Connection

```bash
curl http://localhost:3000/api/orders/test
```

### Bước 2: Test Authentication

```bash
# Đăng nhập trước
curl -X GET http://localhost:3000/api/orders \
  -H "Cookie: sessionToken=your_token_here"
```

### Bước 3: Test Orders API

```bash
curl -X GET "http://localhost:3000/api/orders?page=0&size=10" \
  -H "Cookie: sessionToken=your_token_here"
```

## Troubleshooting:

### 1. Backend không chạy

```bash
# Kiểm tra backend
curl http://localhost:8080/v1/api/orders
```

### 2. CORS Error

Thêm vào backend:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

### 3. Authentication Error

Kiểm tra JWT token có hợp lệ không:

```bash
# Decode JWT token
echo "your_jwt_token" | base64 -d
```

### 4. Database Connection

Kiểm tra database có kết nối được không:

```bash
# Kiểm tra logs backend
tail -f backend.log
```

## Logs quan trọng cần kiểm tra:

### Frontend Logs:

- `"Orders test API called"`
- `"Backend test result"`
- `"Orders API called with params"`
- `"Orders API response status"`

### Backend Logs:

- `"GET /v1/api/orders"`
- `"Authentication successful"`
- `"Database query executed"`

### Network Tab:

- Status codes
- Request headers
- Response headers
- Response body
