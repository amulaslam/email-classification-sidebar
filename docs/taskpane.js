
function validateForm() {
  const topic = document.getElementById("emailTopic").value.trim();
  const subtopic = document.getElementById("subTopic").value.trim();
  const classification = document.getElementById("classification").value;
  const subject = document.getElementById("emailSubject").value.trim();
  const emailTo = document.querySelector('input[name="emailTo"]:checked');

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = !(topic && subtopic && classification && subject && emailTo);
}

function resetForm() {
  document.getElementById("emailTopic").value = "";
  document.getElementById("subTopic").value = "";
  document.getElementById("classification").value = "";
  document.getElementById("emailSubject").value = "";
  document.querySelectorAll('input[name="emailTo"]').forEach((el) => el.checked = false);
  validateForm();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("emailTopic").addEventListener("change", validateForm);
  document.getElementById("subTopic").addEventListener("change", validateForm);
  document.getElementById("classification").addEventListener("change", validateForm);
  document.getElementById("emailSubject").addEventListener("input", validateForm);
  document.querySelectorAll('input[name="emailTo"]').forEach((el) =>
    el.addEventListener("change", validateForm)
  );

  document.getElementById("resetBtn").addEventListener("click", resetForm);
});
