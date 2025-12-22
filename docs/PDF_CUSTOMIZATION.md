# PDF Generation Documentation

This document explains how to customize the PDF generation for Project Quotes and Case Studies.

## Project Quote PDF

### File Location
`src/pages/ProjectQuote.tsx` - Function: `downloadPDF()` (lines 400-503)

### Customization Options

#### 1. Change Company Name & Branding

```typescript
// In downloadPDF() function, find and modify:

// Company name in header
doc.setTextColor(156, 163, 175);
doc.setFontSize(12);
doc.text("Your Company Name", 105, 35, { align: "center" }); // Change from "Bright Idea Projects"

// Footer branding
doc.setTextColor(107, 114, 128);
doc.setFontSize(8);
doc.text("© Your Company Name", 105, 287, { align: "center" }); // Change copyright
```

#### 2. Add Company Logo

```typescript
// Add after header fill rectangle (line 408)
// First, import your logo as base64 or use a URL

// If using base64:
const logoBase64 = "data:image/png;base64,YOUR_BASE64_DATA";
doc.addImage(logoBase64, 'PNG', 20, 10, 40, 30); // x, y, width, height

// If loading from URL (async required):
const loadImage = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

const logo = await loadImage('/your-logo.png');
doc.addImage(logo, 'PNG', 20, 10, 40, 30);
```

#### 3. Customize Colors

```typescript
// Header background color (RGB values)
doc.setFillColor(31, 41, 55); // Dark gray - change to your brand color

// Accent/Title color
doc.setTextColor(251, 191, 36); // Yellow - change to your brand color

// Estimate box background
doc.setFillColor(254, 243, 199); // Light yellow

// Projected impact box
doc.setFillColor(17, 24, 39); // Dark navy
```

#### 4. Currency Symbol

```typescript
// Find the estimated budget line and modify:
doc.text(`$${estimatedBudget.toLocaleString()}`, 105, 122, { align: "center" });

// Change to your currency:
doc.text(`€${estimatedBudget.toLocaleString()}`, 105, 122, { align: "center" }); // Euro
doc.text(`₹${estimatedBudget.toLocaleString()}`, 105, 122, { align: "center" }); // Rupee
doc.text(`£${estimatedBudget.toLocaleString()}`, 105, 122, { align: "center" }); // Pound
```

#### 5. Add Contact Information

```typescript
// Before the footer (around line 481), add:
doc.setTextColor(31, 41, 55);
doc.setFontSize(10);
doc.text("Contact Us:", 20, 265);
doc.text("Email: hello@yourcompany.com", 20, 272);
doc.text("Phone: +1 (555) 123-4567", 20, 279);
doc.text("Website: www.yourcompany.com", 110, 272);
doc.text("Address: 123 Business St, City", 110, 279);
```

#### 6. Add Terms & Conditions

```typescript
// Before saving the document:
doc.setFontSize(7);
doc.setTextColor(120, 120, 120);
doc.text("Terms: This quote is valid for 30 days. Prices are estimates and may vary based on final requirements.", 
  20, 290, { maxWidth: 170 });
```

### Complete Custom Example

```typescript
const downloadPDF = async () => {
  setIsGeneratingPDF(true);
  try {
    const doc = new jsPDF();
    const projectType = projectCategories.find((c) => c.id === formData.selectedCategory)?.name || "";
    
    // ===== CUSTOMIZABLE SETTINGS =====
    const config = {
      companyName: "Your Company Name",
      tagline: "Digital Solutions Provider",
      primaryColor: { r: 59, g: 130, b: 246 },    // Blue
      secondaryColor: { r: 17, g: 24, b: 39 },    // Dark
      accentColor: { r: 16, g: 185, b: 129 },     // Green
      currency: "₹",
      email: "contact@company.com",
      phone: "+91 98765 43210",
      website: "www.yourcompany.com"
    };
    
    // Header with custom branding
    doc.setFillColor(config.secondaryColor.r, config.secondaryColor.g, config.secondaryColor.b);
    doc.rect(0, 0, 210, 50, 'F');
    
    doc.setTextColor(config.primaryColor.r, config.primaryColor.g, config.primaryColor.b);
    doc.setFontSize(24);
    doc.text("Project Quote", 105, 20, { align: "center" });
    
    doc.setTextColor(156, 163, 175);
    doc.setFontSize(14);
    doc.text(config.companyName, 105, 32, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(config.tagline, 105, 42, { align: "center" });
    
    // ... rest of PDF generation
    
    // Save with custom filename
    doc.save(`${config.companyName.replace(/\s+/g, '-')}-quote-${formData.name}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    setIsGeneratingPDF(false);
  }
};
```

---

## Case Study PDF

### File Location
`src/utils/generateCaseStudyPDF.ts`

### Usage

```typescript
import { generateCaseStudyPDF } from '@/utils/generateCaseStudyPDF';

// Basic usage
generateCaseStudyPDF({
  title: "E-commerce Transformation",
  client: "FashionLoop",
  industry: "Retail",
  services: ["Web Development", "SEO"],
  challenge: "Low conversion rates...",
  solution: "Complete platform redesign...",
  result: "37% increase in conversions..."
});

// With custom branding
generateCaseStudyPDF(caseStudyData, {
  companyName: "Your Agency Name",
  primaryColor: { r: 59, g: 130, b: 246 },  // Blue
  accentColor: { r: 17, g: 24, b: 39 },     // Dark
  contactEmail: "hello@youragency.com",
  contactPhone: "+1 (555) 123-4567",
  website: "www.youragency.com"
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `companyName` | string | "DigiSpark" | Your company/agency name |
| `companyLogo` | string | undefined | Base64 encoded logo image |
| `primaryColor` | `{r,g,b}` | Yellow (251,191,36) | Main brand color |
| `accentColor` | `{r,g,b}` | Dark gray (31,41,55) | Secondary/header color |
| `contactEmail` | string | "hello@digispark.com" | Contact email |
| `contactPhone` | string | "+1 (555) 123-4567" | Contact phone |
| `website` | string | "www.digispark.com" | Company website |

### Adding a Logo

```typescript
// Convert image to base64
const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...";

// In generateCaseStudyPDF.ts, after the header fill:
if (config.companyLogo) {
  doc.addImage(config.companyLogo, 'PNG', pageWidth - margin - 40, 10, 35, 35);
}
```

### Customizing Sections

The PDF is structured with these sections:
1. **Header** - Company name, case study label, industry badge
2. **Title Section** - Project title, client name, service tags
3. **Challenge Section** - Gray background box
4. **Solution Section** - Text content
5. **Results Section** - Dark background with white text
6. **Metrics Section** - Up to 3 key metrics displayed
7. **Testimonial Section** - Quote with accent border
8. **Footer** - Contact information

---

## Adding New PDF Templates

### Creating a Custom Invoice PDF

```typescript
// src/utils/generateInvoicePDF.ts
import jsPDF from 'jspdf';

interface InvoiceData {
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  items: { description: string; quantity: number; rate: number }[];
  tax?: number;
  dueDate: string;
}

export const generateInvoicePDF = (invoice: InvoiceData) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(28);
  doc.text("INVOICE", 20, 30);
  
  doc.setFontSize(12);
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 20, 45);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);
  doc.text(`Due Date: ${invoice.dueDate}`, 20, 59);
  
  // Client details
  doc.text("Bill To:", 20, 75);
  doc.text(invoice.clientName, 20, 82);
  doc.text(invoice.clientEmail, 20, 89);
  
  // Items table
  let yPos = 110;
  doc.setFillColor(240, 240, 240);
  doc.rect(20, yPos - 6, 170, 10, 'F');
  doc.text("Description", 25, yPos);
  doc.text("Qty", 120, yPos);
  doc.text("Rate", 140, yPos);
  doc.text("Amount", 165, yPos);
  
  yPos += 10;
  let subtotal = 0;
  
  invoice.items.forEach(item => {
    const amount = item.quantity * item.rate;
    subtotal += amount;
    
    doc.text(item.description, 25, yPos);
    doc.text(String(item.quantity), 120, yPos);
    doc.text(`$${item.rate}`, 140, yPos);
    doc.text(`$${amount}`, 165, yPos);
    yPos += 8;
  });
  
  // Totals
  yPos += 10;
  const tax = invoice.tax ? subtotal * (invoice.tax / 100) : 0;
  const total = subtotal + tax;
  
  doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 140, yPos);
  if (invoice.tax) {
    yPos += 8;
    doc.text(`Tax (${invoice.tax}%): $${tax.toFixed(2)}`, 140, yPos);
  }
  yPos += 10;
  doc.setFontSize(14);
  doc.text(`Total: $${total.toFixed(2)}`, 140, yPos);
  
  doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
};
```

---

## Best Practices

1. **Test with different data lengths** - Long text can overflow boxes
2. **Use splitTextToSize** for multi-line text to handle wrapping
3. **Check page boundaries** - Add new pages if content exceeds pageHeight
4. **Validate colors** - RGB values must be 0-255
5. **Optimize images** - Compress logos to reduce PDF size
6. **Handle async operations** - Use async/await when loading external resources

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Text cut off | Use `doc.splitTextToSize(text, maxWidth)` |
| Blurry images | Use higher resolution source images |
| PDF too large | Compress images before adding |
| Wrong font | jsPDF supports helvetica, courier, times by default |
| Special characters | Ensure UTF-8 encoding for non-ASCII chars |
