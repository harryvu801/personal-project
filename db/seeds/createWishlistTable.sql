CREATE TABLE "public"."wishlist" (
    "wid" serial,
    "user_id" integer,
    "book_id" integer,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "public"."users"("id"),
    FOREIGN KEY ("book_id") REFERENCES "public"."books"("bid")
);
