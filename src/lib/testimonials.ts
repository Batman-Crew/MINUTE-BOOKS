export type Testimonial = { quote: string; name: string; role: string; company: string; placeholder?: boolean };

/**
 * Replace with genuine customer feedback, used with permission, and remove `placeholder`.
 * Never invent names, companies, photographs or quotes. Do not launch with these entries visible.
 */
export const testimonials: Testimonial[] = [
  { quote: "Customer feedback will appear here once it has been collected and approved for publication.", name: "Customer name", role: "Role", company: "Business name", placeholder: true },
  { quote: "Customer feedback will appear here once it has been collected and approved for publication.", name: "Customer name", role: "Role", company: "Business name", placeholder: true },
  { quote: "Customer feedback will appear here once it has been collected and approved for publication.", name: "Customer name", role: "Role", company: "Business name", placeholder: true },
];
