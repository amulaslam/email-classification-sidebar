function validateForm() {
  const topic = document.getElementById("emailTopic").value.trim();
  const subtopic = document.getElementById("subTopic").value.trim();
  const classification = document.getElementById("classification").value;
  const subject = document.getElementById("emailSubject").value.trim();
  const emailTo = document.querySelector('input[name="emailTo"]:checked');

  const sendBtn = document.getElementById("sendBtn");

  if (topic && subtopic && classification && subject && emailTo) {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
}

function resetForm() {
  document.getElementById("emailTopic").value = "";
  document.getElementById("subTopic").value = "";
  document.getElementById("classification").value = "";
  document.getElementById("emailSubject").value = "";
  document.querySelectorAll('input[name="emailTo"]').forEach((el) => el.checked = false);
  validateForm();
}

// Attach events to form fields
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("emailTopic").addEventListener("input", validateForm);
  document.getElementById("subTopic").addEventListener("input", validateForm);
  document.getElementById("classification").addEventListener("change", validateForm);
  document.getElementById("emailSubject").addEventListener("input", validateForm);
  document.querySelectorAll('input[name="emailTo"]').forEach((el) =>
    el.addEventListener("change", validateForm)
  );

  document.getElementById("resetBtn").addEventListener("click", resetForm);
});
