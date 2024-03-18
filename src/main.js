const weaponsRoot = document.querySelector(".weapons");
const allWeaponCategories = document.querySelectorAll(".weapon-category");
const allWeaponSlots = document.querySelectorAll(".weapon-slot");
let selectedCategoryNumber = -1;
let currentWeaponSlotNumber = 0;

let hideWeaponsTimeoutID = null;

document.addEventListener(
    "keydown",
    e => {
        const isNumber = isFinite(e.key);

        if (isNumber && !e.repeat) {
            showWeapons();
            // The key must be decremented by 1 so that the leftmost number key (the 1 key) can
            // choose the first category from the array (which starts at index 0).
            const categoryIndex = e.key - 1;
            changeOrContinueWeaponCategory(categoryIndex);
        }
    }
);

document.addEventListener(
    "mousedown",
    e => {
        // On left click down
        if (e.button == 0) {
            hideWeapons();
        }
    }
);

function changeOrContinueWeaponCategory(categoryIndex) {
    if (hideWeaponsTimeoutID != null) {
        clearTimeout(hideWeaponsTimeoutID);
        hideWeaponsTimeoutID = null;
    }
    
    const category = allWeaponCategories[categoryIndex];
    
    if (category != null) {
        allWeaponCategories.forEach(category => category.classList.remove("active"));
        allWeaponSlots.forEach(slot => slot.classList.remove("selected"));
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

    if (hideWeaponsTimeoutID == null) {
        hideWeaponsTimeoutID = setTimeout(hideWeapons, 4000);
    }
}

function showWeapons() {
    weaponsRoot.style.visibility = "visible";
}

function hideWeapons() {
    weaponsRoot.style.visibility = "hidden";
    hideWeaponsTimeoutID = null;
}