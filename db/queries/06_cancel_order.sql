DELETE a.*, b.*
FROM orders as a, item_orders as b,
WHERE a.id = b.order_id AND a.id = 1;
