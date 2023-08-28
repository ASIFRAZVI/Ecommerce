document.addEventListener("DOMContentLoaded", function () {
  const orderButtons = document.querySelectorAll(".order-button");

  orderButtons.forEach(button => {
      button.addEventListener("click", function (event) {
          event.preventDefault();

          const amount = parseInt(this.getAttribute("data-amount"));

          fetch('/createorder', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  amount: amount,
                  currency: 'INR'
                  // Include other necessary order data
              })
          })
          .then(response => response.json())
          .then(data => {
              const options = {
                  key: 'rzp_test_hOXsPT4JZEM9Bh',
                  amount: data.amount,
                  currency: data.currency,
                  name: 'MilkOmilkyzpure.com',
                  description: 'Fresh Milk Order',
                  order_id: data.order_id,
                  handler: function (response) {
                      // Handle the payment success response
                      alert("Payment successful. Payment ID: " + response.razorpay_payment_id);
                      // Perform any necessary actions after a successful payment
                      fetch('/save-membership', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              orderId: response.razorpay_order_id,
                              paymentId: response.razorpay_payment_id,
                          })
                      })
                      .then(response => response.json())
                      .then(data => {
                          console.log(data);
                          // Redirect the user to the Pro User page
                          window.location.href = '/ordersuccessfull';
                      })
                      .catch(error => console.error(error));
                  }
              };

              const rzp = new Razorpay(options);
              rzp.open();
          })
          .catch(error => console.error(error));
      });
  });
});