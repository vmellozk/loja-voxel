// ProductPage.ts
window.addEventListener('DOMContentLoaded', () => {
  const thumbnails = document.querySelectorAll<HTMLImageElement>('.product-thumb');
  const mainImg = document.getElementById('main-img') as HTMLImageElement | null;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(el => el.classList.remove('selected'));
      thumb.classList.add('selected');
      if (mainImg) mainImg.src = thumb.dataset.img || thumb.src;
    });
  });

  // Quantity logic
  const qtyValue = document.getElementById('qty-value');
  const decrease = document.getElementById('decrease');
  const increase = document.getElementById('increase');
  let qty = 1;

  if (decrease && increase && qtyValue) {
    decrease.addEventListener('click', () => {
      if (qty > 1) qty--;
      qtyValue.textContent = qty.toString();
    });
    increase.addEventListener('click', () => {
      qty++;
      qtyValue.textContent = qty.toString();
    });
  }

  // Add to cart action
  const addCartBtn = document.getElementById('add-cart');
  if(addCartBtn){
    addCartBtn.addEventListener('click', () => {
      addCartBtn.textContent = 'ADICIONADO!';
      addCartBtn.setAttribute('disabled', 'disabled');
      setTimeout(() => {
        addCartBtn.removeAttribute('disabled');
        addCartBtn.textContent = 'ADICIONAR AO CARRINHO';
      }, 1500);
    });
  }
});


//
interface ProductCardState {
  currentIndex: number;
  images: string[];
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const imageContainer = card.querySelector(".image-carousel") as HTMLElement;
    const imgElement = imageContainer.querySelector(".carousel-img") as HTMLImageElement;
    const prevBtn = imageContainer.querySelector(".prev") as HTMLButtonElement;
    const nextBtn = imageContainer.querySelector(".next") as HTMLButtonElement;

    const imageData = card.getAttribute("data-images");
    if (!imageData) return;

    const images = JSON.parse(imageData) as string[];
    const state: ProductCardState = {
      currentIndex: 0,
      images,
    };

    imgElement.src = state.images[state.currentIndex];

    const updateImage = () => {
      imgElement.src = state.images[state.currentIndex];
    };

    prevBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.currentIndex = (state.currentIndex - 1 + state.images.length) % state.images.length;
      updateImage();
    });

    nextBtn.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.currentIndex = (state.currentIndex + 1) % state.images.length;
      updateImage();
    });

    card.addEventListener("mouseenter", () => {
      if (state.images.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
    });

    card.addEventListener("mouseleave", () => {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    });

    // Oculta os botões se só tiver uma imagem
    if (state.images.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  });
});
