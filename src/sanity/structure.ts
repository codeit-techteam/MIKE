import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("Posts")
                .schemaType("post")
                .child(S.documentTypeList("post").title("Posts")),
              S.listItem()
                .title("Authors")
                .schemaType("author")
                .child(S.documentTypeList("author").title("Authors")),
              S.listItem()
                .title("Categories")
                .schemaType("category")
                .child(S.documentTypeList("category").title("Categories")),
              S.listItem()
                .title("Tags")
                .schemaType("tag")
                .child(S.documentTypeList("tag").title("Tags")),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["post", "author", "category", "tag"].includes(item.getId() || "")
      ),
    ]);
