document.addEventListener('DOMContentLoaded', () => {
    const allTabsBlocks = getAllTabsBlocks();
    if (allTabsBlocks.length) {
        Array.from(allTabsBlocks).map((tabsBlock) => tabBlockFunction(tabsBlock));
    }
});

const getAllTabsBlocks = () => document.querySelectorAll('.tabs-content');

const tabBlockFunction = (tabsBlock) => {
    const tabs = tabsBlock.querySelectorAll('.tab-element');
    tabsBlock.innerHTML = '';
    if (tabs.length) {
        const tabsObjects = Array.from(tabs).map((item) => ({
            title: item.dataset.tabTitle,
            content: item.innerHTML
        }));
        const buttons = tabsObjects.map(object => getTabButton(object.title));
        const tabButtonsBlock = createTabButtonsBlock(tabsBlock, buttons);
        const activateTab = (index = 0) => {
            const actives = tabButtonsBlock.querySelectorAll('.tab-button__active');
            Array.from(actives).map(active => active.classList.remove('tab-button__active'));
            buttons[index].classList.add('tab-button__active');
            tabsBlock.innerHTML = tabsObjects[index].content;
        }
        activateTab();
        tabButtonsBlock.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button) {
                const index = [...button.parentElement.children].indexOf(button);
                activateTab(index);
            }
        });
    }
}

const createTabButtonsBlock = (parent, buttons) => {
    const block = document.createElement('div');
    block.classList.add('tabs-buttons');
    buttons.map(button => block.append(button));
    parent.insertAdjacentElement('beforebegin', block);
    return block;
}

const getTabButton = (title) => {
    const button = document.createElement('button');
    button.classList.add('tab-button');
    button.innerHTML = title;
    return button;
}