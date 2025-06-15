// Fetch and populate Classification_Topic, Subtopic, and Classification from SharePoint REST API

const siteUrl = "https://alaalinternational.sharepoint.com/sites/BCS";

const lists = {
  topic: "Classification_Topic",
  subtopic: "Classification_List",
  classification: "EmailSubject_Serial"
};

async function fetchListItems(listName) {
  const url = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose"
      },
      credentials: "include"
    });
    const data = await response.json();
    return data.d.results;
  } catch (error) {
    console.error(`Error fetching list '${listName}':`, error);
    return [];
  }
}

function populateDropdown(elementId, items, textField = "Title", valueField = "Value") {
  const select = document.getElementById(elementId);
  select.innerHTML = "<option value=''>Select</option>";
  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item[valueField] || item[textField];
    option.text = item[textField];
    select.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const topicItems = await fetchListItems(lists.topic);
  populateDropdown("emailTopic", topicItems);

  const subtopicItems = await fetchListItems(lists.subtopic);
  populateDropdown("subTopic", subtopicItems);

  const classificationItems = await fetchListItems(lists.classification);
  populateDropdown("classification", classificationItems);

  validateForm();
});

function validateForm() {
  const topic = document.getElementById("emailTopic").value.trim();
  const subtopic = document.getElementById("subTopic").value.trim();
  const classification = document.getElementById("classification").value.trim();
  const subject = document.getElementById("emailSubject").value.trim();
  const emailTo = document.querySelector("input[name='emailTo']:checked");

  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = !(topic && subtopic && classification && subject && emailTo);
}

function resetForm() {
  document.getElementById("emailTopic").value = "";
  document.getElementById("subTopic").value = "";
  document.getElementById("classification").value = "";
  document.getElementById("emailSubject").value = "";
  document.querySelectorAll("input[name='emailTo']").forEach(el => el.checked = false);
  validateForm();
}

document.getElementById("emailTopic").addEventListener("change", validateForm);
document.getElementById("subTopic").addEventListener("change", validateForm);
document.getElementById("classification").addEventListener("change", validateForm);
document.getElementById("emailSubject").addEventListener("input", validateForm);
document.querySelectorAll("input[name='emailTo']").forEach(el => el.addEventListener("change", validateForm));
document.getElementById("resetBtn").addEventListener("click", resetForm);
