import { NextRequest } from "next/server";
import { envConfig } from "@/config";
import { proxyJson } from "@/lib/next-api-auth";

// This route proxies cart operations to the backend. Configure endpoints via env if needed.
// Supported templates (optional):
// - API_CART_GET_URL_TEMPLATE (e.g. /v1/api/cart or /v1/api/cart/me)
// - API_CART_ADD_URL_TEMPLATE (e.g. /v1/api/cart/items)
// - API_CART_UPDATE_URL_TEMPLATE (e.g. /v1/api/cart/items/{itemId})
// - API_CART_DELETE_URL_TEMPLATE (e.g. /v1/api/cart/items/{itemId})

function buildCandidates(templateEnv: string | undefined, fallbacks: string[]) {
  const candidates: string[] = [];
  if (templateEnv && templateEnv.trim() !== "") candidates.push(templateEnv);
  for (const f of fallbacks) candidates.push(f);
  return candidates;
}

export async function GET(request: NextRequest) {
  const base = envConfig.NEXT_PUBLIC_API_END_POINT;
  const template = process.env.API_CART_GET_URL_TEMPLATE; // e.g., /v1/api/cart or /v1/api/cart/me
  const candidates = buildCandidates(template, [
    "/v1/api/cart",
    "/v1/api/cart/me",
  ]);
  const url = new URL(request.url);
  const qs = url.searchParams.toString();

  for (const path of candidates) {
    const backendUrl = `${base}${path.startsWith("/") ? path : `/${path}`}${
      qs ? `?${qs}` : ""
    }`;
    const res = await proxyJson(backendUrl, request, {
      method: "GET",
      requireAuth: true,
    });
    if (res.status !== 404 && res.status !== 405) return res;
  }
  return new Response(JSON.stringify({ message: "Cart endpoint not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  const base = envConfig.NEXT_PUBLIC_API_END_POINT;
  const template = process.env.API_CART_ADD_URL_TEMPLATE; // e.g., /v1/api/cart/items
  const candidates = buildCandidates(template, [
    "/v1/api/cart/items",
    "/v1/api/cart",
  ]);
  let body: any = null;
  try {
    body = await request.json();
  } catch {}

  for (const path of candidates) {
    const backendUrl = `${base}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await proxyJson(backendUrl, request, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
      requireAuth: true,
    });
    if (res.status !== 404 && res.status !== 405) return res;
  }
  return new Response(
    JSON.stringify({ message: "Add to cart endpoint not found" }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PUT(request: NextRequest) {
  const base = envConfig.NEXT_PUBLIC_API_END_POINT;
  const template = process.env.API_CART_UPDATE_URL_TEMPLATE; // e.g., /v1/api/cart/items/{itemId}
  let body: any = null;
  try {
    body = await request.json();
  } catch {}

  const itemId = body?.itemId || body?.id || "";
  const productId = body?.productId || body?.product_id || "";
  const variantId = body?.variantId ?? body?.variant_id ?? null;

  const fallbacks: string[] = [];
  if (itemId) fallbacks.push(`/v1/api/cart/items/${itemId}`);
  // Some backends update by productId + variantId
  if (productId)
    fallbacks.push(
      `/v1/api/cart/products/${productId}${
        variantId ? `?variantId=${variantId}` : ""
      }`
    );

  const candidates = buildCandidates(
    template ? template.replace("{itemId}", itemId) : undefined,
    fallbacks.length > 0 ? fallbacks : ["/v1/api/cart"]
  );

  for (const path of candidates) {
    const backendUrl = `${base}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await proxyJson(backendUrl, request, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body ?? {}),
      requireAuth: true,
    });
    if (res.status !== 404 && res.status !== 405) return res;
  }
  return new Response(
    JSON.stringify({ message: "Update cart endpoint not found" }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE(request: NextRequest) {
  const base = envConfig.NEXT_PUBLIC_API_END_POINT;
  const template = process.env.API_CART_DELETE_URL_TEMPLATE; // e.g., /v1/api/cart/items/{itemId}

  let body: any = null;
  try {
    body = await request.json();
  } catch {}

  const { searchParams } = new URL(request.url);
  const itemId = body?.itemId || searchParams.get("itemId") || "";
  const productId = body?.productId || searchParams.get("productId") || "";
  const variantId = body?.variantId ?? searchParams.get("variantId");

  const fallbacks: string[] = [];
  if (itemId) fallbacks.push(`/v1/api/cart/items/${itemId}`);
  if (productId)
    fallbacks.push(
      `/v1/api/cart/products/${productId}${
        variantId ? `?variantId=${variantId}` : ""
      }`
    );

  const candidates = buildCandidates(
    template ? template.replace("{itemId}", itemId) : undefined,
    fallbacks.length > 0 ? fallbacks : ["/v1/api/cart/items"]
  );

  for (const path of candidates) {
    const backendUrl = `${base}${path.startsWith("/") ? path : `/${path}`}`;
    const res = await proxyJson(backendUrl, request, {
      method: "DELETE",
      requireAuth: true,
    });
    if (res.status !== 404 && res.status !== 405) return res;
  }
  return new Response(
    JSON.stringify({ message: "Delete cart item endpoint not found" }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}
