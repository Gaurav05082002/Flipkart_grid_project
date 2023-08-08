document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const detectButton = document.getElementById('detectButton');
    const imageContainer = document.getElementById('imageContainer');
  
    let selectedImages = [];
  
    imageInput.addEventListener('change', () => {
      const newImages = Array.from(imageInput.files);
  
      if (selectedImages.length + newImages.length <= 5) {
        selectedImages = selectedImages.concat(newImages);
      } else {
        alert('You can only select up to 5 images. Please remove some images and try again.');
      }
  
      renderImages();
    });
  
    imageContainer.addEventListener('click', (event) => {
      const clickedImageIndex = [...imageContainer.children].indexOf(event.target);
      if (clickedImageIndex !== -1) {
        imageInput.value = '';
        imageInput.click();
      }
    });

    const cameraButton = document.getElementById('cameraButton');

   cameraButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const imageCapture = new ImageCapture(stream.getVideoTracks()[0]);

        const blob = await imageCapture.takePhoto();
        const imageFile = new File([blob], 'captured-image.png');
        selectedImages.push(imageFile);
        renderImages();

        stream.getTracks().forEach(track => track.stop());
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});

  
    detectButton.addEventListener('click', () => {
      if (selectedImages.length === 5) {
        // Simulate ML model response (Replace this part with actual ML model integration)
        const mlResponse = [
          'Object detected in Image 1',
          'Object detected in Image 2',
          'Object detected in Image 3',
          'Object detected in Image 4',
          'Object detected in Image 5',
        ];
  
        showMLResponse(mlResponse);
      } else {
        alert('Please select 5 images before clicking the "Detect" button.');
      }
    });
// Function to handle the "Remove Images" button click
const removeImagesButton = document.getElementById('remove-images-button');
removeImagesButton.addEventListener('click', removeImages);

// Function to handle the "Remove Images" button click
function removeImages() {
    const imageInput = document.getElementById('imageInput');
    imageInput.value = ''; // Clear the file input value
    selectedImages = [];
    renderImages();
}




  
    function renderImages() {
      imageContainer.innerHTML = '';
      selectedImages.forEach((imageFile) => {
        const imageElement = document.createElement('img');
        imageElement.src = URL.createObjectURL(imageFile);
        imageElement.classList.add('selected');
        imageElement.addEventListener('click', () => {
          imageInput.value = '';
          imageInput.click();
        });
        imageContainer.appendChild(imageElement);
      });
    }
  
    function showMLResponse(mlResponse) {
      imageContainer.innerHTML = '';
      mlResponse.forEach((response, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = selectedImages[index] ? URL.createObjectURL(selectedImages[index]) : '';
        imageElement.alt = response;
        imageElement.title = response;
        imageContainer.appendChild(imageElement);
      });
    }


  });
  