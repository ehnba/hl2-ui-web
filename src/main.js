const allWeaponCategories = document.querySelectorAll(".weapon-category");
let selectedCategoryNumber = -1;
let currentWeaponSlotNumber = 0;

const allWeaponSlots = document.querySelectorAll(".weapon-slot");

document.addEventListener(
    "keydown",
    event => {
        const isNumber = isFinite(event.key);

        if (isNumber && !event.repeat) {
            // The key must be decremented by 1 so that the leftmost number key (the 1 key) can
            // choose the first category from the array (which starts at index 0).
            const categoryIndex = event.key - 1;
            changeOrContinueWeaponCategory(categoryIndex);
        }
    }
);

function changeOrContinueWeaponCategory(categoryIndex) {
    allWeaponCategories.forEach(category => category.classList.remove("active"));
    allWeaponSlots.forEach(slot => slot.classList.remove("selected"));
            
    const category = allWeaponCategories[categoryIndex];

    if (category != null) {
        category.classList.add("active");

        // Select the next weapon slot in the current category
        if (categoryIndex == selectedCategoryNumber) {
            const slots = category.querySelectorAll(".weapon-slot");

            currentWeaponSlotNumber++;
            // Wrap around and select the first slot in the category if the next slot doesn't exist
            if (currentWeaponSlotNumber >= slots.length) {
                currentWeaponSlotNumber = 0;
            }

            category.querySelectorAll(".weapon-slot").forEach(
                (slot, index) => {
                    if (index == currentWeaponSlotNumber) {
                        slot.classList.add("selected");
                    }
                }
            );
        }
        // Select corresponding weapon category then select its first weapon slot
        else {
            selectedCategoryNumber = categoryIndex;
            currentWeaponSlotNumber = 0;

            const firstWeaponSlot = category.querySelector(".weapon-slot"); 
            if (firstWeaponSlot != null) {
                firstWeaponSlot.classList.add("selected");
            }
        }
    }
}