// swiper-images-main
new Swiper('.swiper-images-main', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
// End swiper-images-main


// Giỏ hàng
// Kiểm tra xem có giỏ hàng chưa, nếu chưa có thì khởi tạo
const cart = localStorage.getItem("cart");
if (!cart) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// Thêm tour vào giỏ hàng
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    const quantity = parseInt(event.target.quantity.value);
    
    if (tourId && quantity > 0) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const existItem = cart.find(item => item.tourId == tourId);
      if (existItem) {
        existItem.quantity = existItem.quantity + quantity;
      } else {
        const item = {
          tourId: tourId,
          quantity: quantity
        };

        cart.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  })
}
// Hết Giỏ hàng