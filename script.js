
window.onload = function() {
    var now = new Date();
    var todayDate = now.toLocaleDateString('EG'); // استخدام التاريخ المحلي في الصيغة العربية
    var time = now.toLocaleTimeString('EG', { hour12: false }); // استخدام الوقت بصيغة 24 ساعة
  
    // تعيين تاريخ ووقت الطلب
    document.getElementById('date').value = todayDate;
    document.getElementById('time').value = time;
  
    var citySelect = document.getElementById('city');
    var quantityInput = document.getElementById('quantity');
    var productContainer = document.querySelector('.product-container');
  
    if (citySelect) {
        citySelect.addEventListener('change', function() {
            updateDeliveryCost();
        });
    }
  
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            updateTotal();
        });
  
        quantityInput.value = 1;
        updateTotal();
    }
  
    if (productContainer) {
        productContainer.classList.add('fade-in-active');
    }
  
    var images = document.querySelectorAll('.product-images img');
    var currentIndex = 0;
  
    function showNextImage() {
        if (images.length === 0) return;
        
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }
  
    if (images.length > 0) {
        images[currentIndex].classList.add('active');
        setInterval(showNextImage, 3000);
    }
  };
  
  function updateDeliveryCost() {
    var city = document.getElementById('city').value;
    var deliveryCost = city === 'الجزائر' ? 400 : 700;
    document.getElementById('deliveryCost').value = deliveryCost + ' دج'; // إضافة "دج" للعرض
  
    updateTotal();
  }
  
  function updateTotal() {
    var productPrice = 1300; // تغيير السعر إلى السعر الصحيح
    var quantity = parseInt(document.getElementById('quantity').value) || 1; // تحديد القيمة الافتراضية
    var deliveryCost = parseFloat(document.getElementById('deliveryCost').value) || 0;
    var total = (productPrice * quantity) + deliveryCost;
    document.getElementById('total').value = total + ' دج'; // إضافة "دج" للعرض
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();
  
    var form = event.target;
    var formData = new FormData(form);
    formData.append('time', document.getElementById('time').value);
  
    fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(formData).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => response.ok ? response.text() : Promise.reject('Network response was not ok'))
    .then(data => {
      console.log('البيانات المستلمة:', data);
      alert("تم إرسال البيانات بنجاح!");
      form.reset();
      window.onload(); // إعادة تحميل العناصر
    })
    .catch(error => {
      console.error('خطأ:', error);
      alert("حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.");
    });
  }
  