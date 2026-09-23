import { JsonLdScript } from "@/components/JsonLdScript";
import { organizationSchema, softwareSchema, websiteSchema } from "@/lib/seo";

export function JsonLd() {
  return (
    <>
      <JsonLdScript data={websiteSchema()} />
      <JsonLdScript data={organizationSchema()} />
      <JsonLdScript data={softwareSchema()} />
    </>
  );
}
