"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Spinner, ButtonLoader } from "@/components/ui/loader";

export default function LoaderDemoPage() {
  const [showMainLoader, setShowMainLoader] = useState(false);
  const [showButtonLoader, setShowButtonLoader] = useState(false);

  const handleMainLoader = () => {
    setShowMainLoader(true);
    setTimeout(() => setShowMainLoader(false), 3000);
  };

  const handleButtonLoader = () => {
    setShowButtonLoader(true);
    setTimeout(() => setShowButtonLoader(false), 2000);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Demo Component Loader
        </h1>
        <p className="text-gray-600">
          Test các component loading khác nhau trong ứng dụng
        </p>
      </div>

      {/* Main Loader Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>1. Main Loader (Full Screen)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Loader chính với animation logo và overlay toàn màn hình
          </p>
          <Button onClick={handleMainLoader} variant="outline">
            Hiển thị Main Loader (3 giây)
          </Button>
          {showMainLoader && (
            <Loader
              isLoading={true}
              message="Đang tải dữ liệu..."
              size="lg"
              overlay={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Spinner Demo */}
      <Card>
        <CardHeader>
          <CardTitle>2. Spinner Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Các spinner với kích thước khác nhau</p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="sm" />
              <span className="text-sm text-gray-500">Small</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="md" />
              <span className="text-sm text-gray-500">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" />
              <span className="text-sm text-gray-500">Large</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Loader Demo */}
      <Card>
        <CardHeader>
          <CardTitle>3. Button Loader</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">Loader cho các button khi submit form</p>
          <div className="flex gap-4">
            <Button
              onClick={handleButtonLoader}
              disabled={showButtonLoader}
              className="min-w-[200px]"
            >
              {showButtonLoader ? (
                <>
                  <ButtonLoader size="sm" />
                  <span className="ml-2">Đang xử lý...</span>
                </>
              ) : (
                "Click để test Button Loader"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>5. Cách sử dụng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Main Loader (Full Screen):</h4>
            <code className="text-sm text-gray-700">
              {`<Loader isLoading={true} message="Đang tải..." size="lg" overlay={true} />`}
            </code>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Spinner:</h4>
            <code className="text-sm text-gray-700">
              {`<Spinner size="md" />`}
            </code>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Button Loader:</h4>
            <code className="text-sm text-gray-700">
              {`<ButtonLoader size="sm" />`}
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
