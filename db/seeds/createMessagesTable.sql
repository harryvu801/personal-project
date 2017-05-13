CREATE TABLE "public"."messages" (
    "mid" serial,
    "message" text,
    "user1_id" integer,
    "user2_id" integer,
    PRIMARY KEY ("mid"),
    FOREIGN KEY ("user1_id") REFERENCES "public"."users"("id"),
    FOREIGN KEY ("user2_id") REFERENCES "public"."users"("id")
);
