<?php
require 'vendor/autoload.php';
// This is a sample test API key. Sign in to see examples pre-filled with your key.
\Stripe\Stripe::setApiKey('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
function calculateOrderAmount(array $items): int {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // customers from directly manipulating the amount on the client
  return 1400;
}
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type');

$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
  header("HTTP/1.1 200 OK");
  die();
}

try {
  // retrieve JSON from POST body
  $json_str = file_get_contents('php://input');
  $json_obj = json_decode($json_str);
  $paymentIntent = \Stripe\PaymentIntent::create([
    'amount' => calculateOrderAmount($json_obj->items),
    'currency' => 'usd',
  ]);
  $output = [
    'clientSecret' => $paymentIntent->client_secret,
  ];
  echo json_encode($output);
} catch (Error $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}