document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const background = document.getElementById('background');
    const newMsgBtn = document.getElementById('newMessage');
    const updateBtns = document.querySelectorAll('.updateMsg');
    const form = document.getElementById('modalForm');
    const text = document.getElementById('text');

    if (!modal || !background || !form || !text) return;

    const openModal = () => {
        modal.classList.remove('hidden');
        modal.classList.add('visible');

        background.classList.remove('hidden');
        background.classList.add('visible');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('visible');

        background.classList.add('hidden');
        background.classList.remove('visible');
    };

    // Make sure modal is closed on load
    closeModal();

    // Update buttons -> open modal for editing existing message
    updateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            const id = btn.dataset.id;
            const existingText = btn.dataset.text || '';

            form.action = `/board/update/${id}`;
            text.value = existingText;

            openModal();
        });
    });

    // New message button -> open modal for new message
    if (newMsgBtn) {
        newMsgBtn.addEventListener('click', (e) => {
            e.preventDefault();

            form.action = '/board/new';
            text.value = '';

            openModal();
        });
    }

    // Click on background closes modal
    background.addEventListener('click', (e) => {
        // Optional: only close if they clicked directly on the background
        if (e.target === background) {
            closeModal();
        }
    });

    // Submitting the form closes modal; redirect handled by server
    form.addEventListener('submit', () => {
        closeModal();
    });
});