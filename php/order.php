<?php
// Check for empty fields
if(empty($_POST['name2'])      ||
   empty($_POST['email2'])     ||
   empty($_POST['phone2'])     ||
   empty($_POST['message2'])   ||
   !filter_var($_POST['email2'],FILTER_VALIDATE_EMAIL))
   {
     echo "Не запоўнены ўсе палі";
     return false;
   }

$name = strip_tags(htmlspecialchars($_POST['name2']));
$email_address = strip_tags(htmlspecialchars($_POST['email2']));
$phone = strip_tags(htmlspecialchars($_POST['phone2']));
$message = strip_tags(htmlspecialchars($_POST['message2']));

// Create the email and send the message
$to = 'team@falanster.by'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "Замова з BZH-BZH.BY ад $name";
$email_body = "\r\n"."Дэталі:\r\nІмя: $name\r\nІмэйл: $email_address\r\nТэлефон: $phone\r\nЗмест:\r\n$message";


$headers = "From: $email_address\r\n";
$headers.= "MIME-Version: 1.0\r\n";
$headers.= "Content-Type: text/html; charset=ISO-8859-1\r\n";
$headers.= "X-Priority: 1\r\n";

//$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";
mail($to,$email_subject,$email_body,$headers);
return true;
?>
