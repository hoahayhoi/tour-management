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

// Hiển thị số lượng vào mini cart
const showMiniCart = () => {
  const miniCart = document.querySelector("[mini-cart]");
  if(miniCart) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    miniCart.innerHTML = cart.length;
  }
}
showMiniCart();

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
      showMiniCart();
    }
  })
}
// Hết Giỏ hàng



// Hiển thị sản phẩm vào trang giỏ hàng
const drawCart = () => {
  const tableCart = document.querySelector("[table-cart]");
  if(tableCart) {
    fetch("/cart/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: localStorage.getItem("cart")
    })
      .then(res => res.json())
      .then(data => {
        const total = data.total;
        const tours = data.tours;
  
        const htmlsTr = tours.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img 
                src="${item.image}" 
                alt="${item.title}" 
                width="80px"
              >
            </td>
            <td>
              <a href="/tours/detail/${item.slug}">
                ${item.title}
              </a>
            </td>
            <td>
              ${item.price_special.toLocaleString()}đ
            </td>
            <td>
              <input type="number" name="quantity" value="${item.quantity}" min="1" item-id="${item.tourId}" style="width: 60px">
            </td>
            <td>
              ${item.total.toLocaleString()}đ
            </td>
            <td>
              <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
            </td>
          </tr>
        `);
  
        const tbody = tableCart.querySelector("tbody");
        tbody.innerHTML = htmlsTr.join("");
  
        const totalPrice = document.querySelector("[total-price]");
        if(totalPrice) {
          totalPrice.innerHTML = total.toLocaleString();
        }
      })
  }
}
drawCart();