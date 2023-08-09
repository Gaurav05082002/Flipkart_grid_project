document.addEventListener("DOMContentLoaded", () => {
  // const fileInputs = document.querySelectorAll(".file-input");
  const fileInputs = document.querySelectorAll(".file-input");


  
  fileInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          const box = input.parentElement;
          const boxId = box.id;
          const imgPreview = document.createElement("img");
          imgPreview.classList.add("img-preview");
          imgPreview.src = e.target.result;

          const removeBtn = document.createElement("button");
          removeBtn.classList.add("remove-btn");
          removeBtn.innerText = "Remove";
          removeBtn.addEventListener("click", () => {
            box.removeChild(imgPreview);
            box.removeChild(removeBtn);
            input.value = "";
            box.querySelector(".box-label").style.display = "block";
          });

          box.appendChild(imgPreview);
          box.appendChild(removeBtn);
          box.querySelector(".box-label").style.display = "none";
        };
        
        reader.readAsDataURL(file);
      }
    });

  });

  

const detectButton = document.getElementById("detect-button");

 



  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (event) => {
        reject(event.error);
      };
      reader.readAsDataURL(file);
    });
  }


  detectButton.addEventListener("click", () => {
    const imagePreviews = document.querySelectorAll(".img-preview");
    const images = Array.from(imagePreviews).map((img) => img.src);

    // Make a POST request to the API with the 'images' data
    // Handle the API response and display it on the webpage
    // Example code (using fetch):
    /*
    fetch("YOUR_API_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ images }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle API response data and display on the webpage
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    */
      // Simulated API response data for demonstration
    const apiResponse = [{
      grade: 1,
      diseaseName: "retinopathy",
      stage: "medium",
      accuracy: "92%",
    }];

    // Create and populate the report div
    const reportDiv = document.createElement("div");
    reportDiv.classList.add("report");
    
    const reportContent = `
      <h2>Diagnostic Report</h2>
      <p><strong>Grade:</strong> ${apiResponse[0].grade}</p>
      <p><strong>Disease Name:</strong> ${apiResponse[0].diseaseName}</p>
      <p><strong>Stage:</strong> ${apiResponse[0].stage}</p>
      <p><strong>Accuracy:</strong> ${apiResponse[0].accuracy}</p>
      <p><strong>Date & Time:</strong> ${getCurrentDateTime()}</p>
      <label for="fullName">Full Name:</label>
      <input type="text" id="fullName">
      <button id="printButton">Print as PDF</button>

    `;

    reportDiv.innerHTML = reportContent;
    document.body.appendChild(reportDiv);



    // Print button click handler
    const printButton = document.getElementById("printButton");
    printButton.addEventListener("click", () => {
      const fullName = document.getElementById("fullName").value;
      const reportContentWithFullName = `
        <h2>Diagnostic Report for ${fullName}</h2>
        ${reportContent}
      `;
      printPageArea(report);
      // printPDF(reportContentWithFullName);
    });

  });
  function printPDF(content) {
    const pdf = new jsPDF();
    pdf.text(content, 10, 10);
  
    // Save the PDF
    pdf.save("diagnostic_report.pdf");
  }
  // function printPDF(content) {
  //   const pdf = new jsPDF();
  //   pdf.text(content, 10, 10);
  
  //   const pdfBlob = pdf.output("blob");
  //   const pdfUrl = URL.createObjectURL(pdfBlob);
  
  //   const printWindow = window.open(pdfUrl);
    
  //   printWindow.onload = () => {
  //     printWindow.print();
  //     URL.revokeObjectURL(pdfUrl);
  //   };
  // }
    // Function to get the current date and time
    function getCurrentDateTime() {
      const now = new Date();
      return now.toLocaleString();
    }
  

  

    
    


    
  
});

