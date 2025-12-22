import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Download, Copy, Link, Mail, Phone, Wifi, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const QRCodeGenerator = () => {
  const { toast } = useToast();
  const qrRef = useRef<HTMLDivElement>(null);
  
  // QR Code states
  const [qrType, setQrType] = useState("url");
  const [qrValue, setQrValue] = useState("https://digispark.agency");
  const [qrSize, setQrSize] = useState(200);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  
  // Form states for different types
  const [urlInput, setUrlInput] = useState("https://");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiType, setWifiType] = useState("WPA");

  const generateQRValue = () => {
    switch (qrType) {
      case "url":
        return urlInput || "https://digispark.agency";
      case "email":
        return `mailto:${emailInput}`;
      case "phone":
        return `tel:${phoneInput}`;
      case "wifi":
        return `WIFI:T:${wifiType};S:${wifiName};P:${wifiPassword};;`;
      default:
        return urlInput;
    }
  };

  const handleGenerate = () => {
    const value = generateQRValue();
    setQrValue(value);
    toast({
      title: "QR Code Generated!",
      description: "Your QR code is ready to download.",
    });
  };

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `qrcode-${Date.now()}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    
    toast({
      title: "Downloaded!",
      description: "QR code saved to your device.",
    });
  };

  const copyQRValue = () => {
    navigator.clipboard.writeText(qrValue);
    toast({
      title: "Copied!",
      description: "QR code value copied to clipboard.",
    });
  };

  const qrTypes = [
    { id: "url", icon: Link, label: "URL" },
    { id: "email", icon: Mail, label: "Email" },
    { id: "phone", icon: Phone, label: "Phone" },
    { id: "wifi", icon: Wifi, label: "WiFi" },
  ];

  return (
    <Card className="border-yellow-400/20 bg-black/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-yellow-400" />
              QR Code Generator
            </h3>
            <p className="text-gray-300 mb-6">
              Create custom QR codes for URLs, emails, phone numbers, and WiFi networks.
            </p>

            {/* QR Type Selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {qrTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQrType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    qrType === type.id
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </motion.button>
              ))}
            </div>

            {/* Dynamic Input Fields */}
            <div className="space-y-4">
              {qrType === "url" && (
                <div>
                  <label className="block text-white mb-2">Website URL</label>
                  <Input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              )}

              {qrType === "email" && (
                <div>
                  <label className="block text-white mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="contact@example.com"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              )}

              {qrType === "phone" && (
                <div>
                  <label className="block text-white mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+1234567890"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              )}

              {qrType === "wifi" && (
                <>
                  <div>
                    <label className="block text-white mb-2">Network Name (SSID)</label>
                    <Input
                      type="text"
                      value={wifiName}
                      onChange={(e) => setWifiName(e.target.value)}
                      placeholder="MyWiFiNetwork"
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Password</label>
                    <Input
                      type="password"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-800 text-white border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Security Type</label>
                    <select
                      value={wifiType}
                      onChange={(e) => setWifiType(e.target.value)}
                      className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-700"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </div>
                </>
              )}

              {/* Color customization */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">QR Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-12 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="bg-gray-800 text-white flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white mb-2">Background</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-12 h-10 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="bg-gray-800 text-white flex-1"
                    />
                  </div>
                </div>
              </div>

              {/* Size slider */}
              <div>
                <label className="block text-white mb-2">Size: {qrSize}px</label>
                <input
                  type="range"
                  min="100"
                  max="400"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                  className="w-full accent-yellow-400"
                />
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold"
              >
                Generate QR Code
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
            
            <motion.div
              ref={qrRef}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 bg-white rounded-xl shadow-2xl"
              style={{ backgroundColor: bgColor }}
            >
              <QRCodeSVG
                value={qrValue}
                size={qrSize}
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={true}
              />
            </motion.div>

            <p className="text-gray-400 text-sm mt-4 text-center max-w-xs truncate">
              {qrValue}
            </p>

            <div className="flex gap-3 mt-6">
              <Button
                onClick={downloadQRCode}
                className="bg-emerald-500 hover:bg-emerald-400 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={copyQRValue}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Value
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRCodeGenerator;
