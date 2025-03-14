document.getElementById("itemForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", document.getElementById("title").value);
    formData.append("des", document.getElementById("des").value);
    formData.append("image", document.getElementById("img").files[0]);

    try {
        const response = await fetch("http://localhost:9000/stone", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            document.getElementById("itemForm").reset();
            loadItems();
        } else {
            alert("Failed to upload item.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});


async function loadItems() {
    try {
        const response = await fetch("http://localhost:9000/stone");
        const items = await response.json();
        const container = document.getElementById("itemsContainer");

        container.innerHTML = "";
        items.forEach(item => {
            const div = document.createElement("div");
            div.className = "item";
            div.innerHTML = `
                <h3>${item.title}</h3>
                <img src="http://localhost:9000${item.img}" alt="${item.title}" style="width:100px;height:100px;">
                <p>${item.des}</p>
               
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error loading items:", error);
    }
}



loadItems();
