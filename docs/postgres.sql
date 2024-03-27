CREATE TABLE "user" (
   "id" INT NOT NULL,
   "password" VARCHAR(60) DEFAULT NULL,
   "access_token" VARCHAR(40) DEFAULT NULL,
   "email" VARCHAR(100) UNIQUE NOT NULL,
   "phone" VARCHAR(20) UNIQUE DEFAULT NULL,
   "is_shadowed" BOOLEAN NOT NULL DEFAULT FALSE,
   "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ("id")
);

select *
from "user";

CREATE TABLE "user_details" (
   "id" INT NOT NULL,
   "user_id" INT NOT NULL,
   "name" VARCHAR(100) DEFAULT NULL,
   "image_url" VARCHAR(255) DEFAULT NULL,
   "company" VARCHAR(100) DEFAULT NULL,
   "gst" VARCHAR(20) DEFAULT NULL,
   "is_shadowed" BOOLEAN NOT NULL DEFAULT FALSE,
   "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ("id"),
   FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE INDEX "idx_user_profile_user" ON "user_details" ("user_id");

CREATE TABLE "amazon_seller_account" (
   "id" SERIAL NOT NULL,
   "user_id" INT NOT NULL,
   "name" VARCHAR(30) NOT NULL,
   "seller_id" VARCHAR(100) DEFAULT NULL,
   "refresh_token" VARCHAR(500) DEFAULT NULL,
   "access_token" VARCHAR(500) DEFAULT NULL,
   "is_shadowed" BOOLEAN NOT NULL DEFAULT FALSE,
   "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ("id"),
   FOREIGN KEY ("user_id") REFERENCES "user" ("id")
);

CREATE INDEX "idx_partner_account_user" ON "amazon_seller_account" ("user_id");

CREATE TABLE "amazon_seller_marketplace" (
  "id" INT NOT NULL,
  "seller_account_id" INT NOT NULL,
  "name" VARCHAR(30) DEFAULT NULL,
  "marketplace_id" VARCHAR(20) DEFAULT NULL,
  "country_code" varchar(2) DEFAULT NULL,
  "currency_code" VARCHAR(3) DEFAULT NULL,
  "domain_name" VARCHAR(50) DEFAULT NULL,
  "default_language" VARCHAR(5) DEFAULT NULL,
  "is_participating" BOOLEAN DEFAULT NULL,
  "has_suspended_listings" BOOLEAN DEFAULT NULL,
  "is_shadowed" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("seller_account_id") REFERENCES "amazon_seller_account" ("id")
);

select * from amazon_seller_account;

CREATE TABLE amazon_sales (
   id INT NOT NULL,
   seller_account_id INT NOT NULL,
   start_unix_timestamp TIMESTAMP WITHOUT TIME ZONE UNIQUE DEFAULT NULL,
   end_unix_timestamp TIMESTAMP WITHOUT TIME ZONE UNIQUE DEFAULT NULL,
   unit_count INTEGER DEFAULT NULL,
   order_item_count INTEGER DEFAULT NULL,
   order_count INTEGER DEFAULT NULL,
   total_sales_amount NUMERIC DEFAULT NULL,
   total_sales_currency VARCHAR(10) DEFAULT NULL,
   average_unit_price NUMERIC DEFAULT NULL,
   average_unit_price_currency VARCHAR(10) DEFAULT NULL,
   is_shadowed BOOLEAN NOT NULL DEFAULT FALSE,
   created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY ("id"),
   FOREIGN KEY ("seller_account_id") REFERENCES "amazon_seller_account" ("id")
);

select * from amazon_sales;

CREATE TABLE amazon_orders (
    id INT NOT NULL,
    seller_account_id INT NOT NULL,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    earliest_ship_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    sales_channel VARCHAR(255) DEFAULT NULL,
    has_automated_shipping BOOLEAN DEFAULT NULL,
    status VARCHAR(255) DEFAULT NULL,
    number_of_items_shipped INTEGER DEFAULT NULL,
    order_type VARCHAR(255) DEFAULT NULL,
    is_premium_order BOOLEAN DEFAULT NULL,
    is_prime BOOLEAN DEFAULT NULL,
    fulfillment_channel VARCHAR(255) DEFAULT NULL,
    number_of_items_unshipped INTEGER DEFAULT NULL,
    has_regulated_items BOOLEAN DEFAULT NULL,
    is_replacement_order BOOLEAN DEFAULT NULL,
    is_sold_by_ab BOOLEAN DEFAULT NULL,
    latest_ship_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    ship_service_level VARCHAR(255) DEFAULT NULL,
    is_ispu BOOLEAN DEFAULT NULL,
    marketplace_id VARCHAR(255) DEFAULT NULL,
    purchase_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    is_access_point_order BOOLEAN DEFAULT NULL,
    is_business_order BOOLEAN DEFAULT NULL,
    order_total_amount NUMERIC DEFAULT NULL,
    order_total_currency_code VARCHAR(10) DEFAULT NULL,
    payment_method_details TEXT DEFAULT NULL,
    is_global_express_enabled BOOLEAN DEFAULT NULL,
    last_update_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    is_shadowed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("seller_account_id") REFERENCES "amazon_seller_account" ("id")
);





select * from "partner_account";

delete from "partner_account" where "user_id" = 5;

drop table "amazon_seller_account";

INSERT INTO "public"."amazon_seller_account" ("user_id", "name", "seller_id", "refresh_token", "access_token",
                                              "is_shadowed", "created_at", "updated_at")
VALUES (5, 'Amazon', 'A14IOOJN7DLJME',
        'Atzr|IwEBIIxTk6cgALMIv4m50RcPWCywTuL-yKkeg_fTAoITvnopdThtGzi99oDC2BhNr8VfIYWVQOUVMOodymPMh6kEQRnAw0tV-wjBjVPlGz0oa4FRElQupA24ul_rJVql91jq28eMo9yyxo184Z94zK1Q0-1S1q3gbRbIJaD_R9Q6NQCtZz8ROPBDM8bTYufuJrz7Fk55if6pB-fskcWeI55xzTQmSlMDUGkyqwfhwbC91NnHifPVBu7fkUOGHTlF8g2zZ8LIOsZqcOE5j9eiK67R_momf8xhMJld-hoGAbvsalL4nZgXg2Oezva4ruYd5JvHYix8gPXIuX4Ovw4CzD-kvzCj',
        'Atza|IwEBIJO8U1sbiGqsmES2Z7XWUQPK77-281ck6PhNiqsSQXKQbdx5XvwtXXHKF7hRjOtAYFjUzZrZrWpT2BCRBcRinFclzgSSw2LOJCDQAHge9JoJK8V_2Qdy40yj9xys_QA01SBmcylzcevnlUugE637oiCBQ0GOdRhR-PBwF0MuDXT8EABtlscKVXluLG_IukGzlJ_6IXB4lxdzJYqrdT6uqU6pigAWiwaraomUo__wOPXxgPD73-fgBeD4E4mkz97W0zeKn2Hru1Gg1NIApypIZiLh7FUBtcNwLQJcMDoSMVcFDZES4TeiVKl0bvrF90SqkrY',
        false, '2024-03-21 22:36:25.362', '2024-03-21 22:36:25.362');


