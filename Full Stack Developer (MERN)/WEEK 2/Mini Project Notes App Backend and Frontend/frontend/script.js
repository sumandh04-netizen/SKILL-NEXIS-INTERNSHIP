const API_URL = "http://127.0.0.1:5000";

let notes = [];

let editingNoteId = null;

let deletingNoteId = null;

let currentView = "active";

let unlockedNotes = {};

let reminderTimers = {};


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (
            localStorage.getItem("theme")
            === "dark"
        ) {

            document.body.classList.add("dark");

            themeBtn.textContent = "☀️";
        }

        if (
            localStorage.getItem("token")
        ) {

            showNotesPage();

            loadNotes();

        } else {

            showHomePage();
        }

        setupDrawing();

    }
);


// =====================================================
// PAGE DISPLAY
// =====================================================

function showHomePage() {

    homePage.classList.remove(
        "hidden"
    );

    notesPage.classList.add(
        "hidden"
    );

    logoutBtn.classList.add(
        "hidden"
    );
}


function showNotesPage() {

    homePage.classList.add(
        "hidden"
    );

    notesPage.classList.remove(
        "hidden"
    );

    logoutBtn.classList.remove(
        "hidden"
    );
}


// =====================================================
// MODALS
// =====================================================

function openRegister() {

    closeModals();

    registerModal.classList.add(
        "show"
    );
}


function openLogin() {

    closeModals();

    loginModal.classList.add(
        "show"
    );
}


function openAddNote() {

    editingNoteId = null;

    noteModalTitle.textContent =
        "📝 New Note";

    saveNoteBtn.textContent =
        "Save Note";

    noteTitle.value = "";

    noteContent.innerHTML = "";

    noteColor.value =
        "yellow";

    noteTags.value = "";

    noteReminder.value = "";

    pdfStatus.textContent = "";

    autoSave.textContent =
        "✓ Ready";

    closeModals();

    noteModal.classList.add(
        "show"
    );
}


function closeModals() {

    document
        .querySelectorAll(".modal")
        .forEach(
            modal =>
                modal.classList.remove(
                    "show"
                )
        );
}


function switchToLogin() {

    closeModals();

    openLogin();
}


function switchToRegister() {

    closeModals();

    openRegister();
}


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeModals();

        }

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal"
            )
        ) {

            closeModals();

        }

    }
);


// =====================================================
// REGISTER
// =====================================================

async function registerUser(event) {

    event.preventDefault();

    try {

        const response =
            await fetch(
                `${API_URL}/register`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            name:
                                registerName.value.trim(),

                            email:
                                registerEmail.value.trim(),

                            password:
                                registerPassword.value

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message
                || "Registration failed"
            );

            return;
        }


        showToast(
            "Registration successful! 🎉"
        );


        document
            .querySelector(
                "#registerModal form"
            )
            .reset();


        closeModals();


        setTimeout(
            openLogin,
            500
        );

    }

    catch (error) {

        console.error(error);

        showToast(
            "Start Flask backend first."
        );
    }
}


// =====================================================
// LOGIN
// =====================================================

async function loginUser(event) {

    event.preventDefault();

    try {

        const response =
            await fetch(
                `${API_URL}/login`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            email:
                                loginEmail.value.trim(),

                            password:
                                loginPassword.value

                        })

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message
                || "Login failed"
            );

            return;
        }


        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "userName",
            data.name || ""
        );


        closeModals();

        showNotesPage();

        loadNotes();

        showToast(
            "Login successful! 👋"
        );

    }

    catch (error) {

        console.error(error);

        showToast(
            "Cannot connect to backend."
        );
    }
}


// =====================================================
// LOGOUT
// =====================================================

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "userName"
    );

    notes = [];

    showHomePage();

    showToast(
        "Logged out successfully"
    );
}


// =====================================================
// API HELPER
// =====================================================

async function api(
    path,
    options = {}
) {

    const token =
        localStorage.getItem(
            "token"
        );


    options.headers = {

        ...(options.headers || {}),

        Authorization:
            `Bearer ${token}`

    };


    const response =
        await fetch(
            API_URL + path,
            options
        );


    if (
        response.status === 401
    ) {

        localStorage.removeItem(
            "token"
        );

        showHomePage();

        throw new Error(
            "Unauthorized"
        );
    }


    return response;
}


// =====================================================
// LOAD NOTES
// =====================================================

async function loadNotes() {

    try {

        const response =
            await api(
                `/notes?archived=${
                    currentView === "archive"
                }`
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message
            );

            return;
        }


        notes =
            data.notes || [];


        displayNotes(
            notes
        );


        scheduleReminders();

    }

    catch (error) {

        if (
            error.message
            !== "Unauthorized"
        ) {

            showToast(
                "Could not load notes"
            );
        }
    }
}


// =====================================================
// DISPLAY NOTES
// =====================================================

function displayNotes(
    noteList
) {

    const container =
        document.getElementById(
            "notesContainer"
        );


    container.innerHTML = "";


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const filtered =
        noteList.filter(
            note => {

                const text =
                    `${note.title}
                    ${note.content}
                    ${(note.tags || []).join(" ")}`;

                return text
                    .toLowerCase()
                    .includes(search);
            }
        );


    emptyMessage.classList.toggle(
        "hidden",
        filtered.length > 0
    );


    filtered.forEach(
        note => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                `note-card note-${
                    note.color || "yellow"
                }`;


            if (note.pinned) {

                card.classList.add(
                    "pinned"
                );
            }


            card.dataset.id =
                note.id;


            card.draggable =
                true;


            if (
                note.locked
                && !unlockedNotes[note.id]
            ) {

                card.innerHTML = `

                    <div class="note-pin">
                        ${note.pinned ? "📌" : ""}
                    </div>

                    <h3>
                        🔒 Locked Note
                    </h3>

                    <div class="note-content">
                        <p>
                            This note is protected.
                            Unlock it to view the content.
                        </p>
                    </div>

                    <div class="note-actions">

                        <button
                            class="edit-btn"
                            onclick="openUnlock('${note.id}')"
                        >
                            🔓 Unlock
                        </button>

                        <button
                            class="archive-btn"
                            onclick="archiveNote(
                                '${note.id}',
                                ${currentView !== "archive"}
                            )"
                        >
                            ${
                                currentView === "archive"
                                ? "↩ Restore"
                                : "🗃️ Archive"
                            }
                        </button>

                    </div>
                `;

            } else {

                card.innerHTML = `

                    <div class="note-pin">
                        ${note.pinned ? "📌" : ""}
                    </div>

                    <h3>
                        ${escapeHTML(note.title)}
                    </h3>

                    <div class="note-content">
                        ${note.content}
                    </div>

                    ${
                        note.drawing
                        ?
                        `<img
                            src="${note.drawing}"
                            style="
                                max-width:100%;
                                margin-top:10px;
                                border-radius:10px;
                            "
                        >`
                        :
                        ""
                    }

                    <div class="tags">

                        ${(note.tags || [])
                            .map(
                                tag =>
                                    `<span class="tag">
                                        #${escapeHTML(tag)}
                                    </span>`
                            )
                            .join("")
                        }

                    </div>

                    <span class="note-date">

                        🕒
                        ${formatDate(
                            note.updated_at
                            || note.created_at
                        )}

                        ${
                            note.pdf_url
                            ?
                            `
                            ·
                            <a
                                href="${API_URL}${note.pdf_url}"
                                target="_blank"
                            >
                                📄 PDF
                            </a>
                            `
                            :
                            ""
                        }

                    </span>


                    <div class="note-actions">

                        <button
                            class="edit-btn"
                            onclick="editNote('${note.id}')"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            class="pin-btn"
                            onclick="togglePin(
                                '${note.id}',
                                ${!note.pinned}
                            )"
                        >
                            ${
                                note.pinned
                                ? "📍 Unpin"
                                : "📌 Pin"
                            }
                        </button>

                        <button
                            class="archive-btn"
                            onclick="archiveNote(
                                '${note.id}',
                                ${currentView !== "archive"}
                            )"
                        >
                            ${
                                currentView === "archive"
                                ? "↩ Restore"
                                : "🗃️ Archive"
                            }
                        </button>

                        ${
                            currentView === "active"
                            ?
                            `
                            <button
                                class="delete-btn"
                                onclick="openDelete(
                                    '${note.id}'
                                )"
                            >
                                🗑️ Trash
                            </button>
                            `
                            :
                            ""
                        }

                    </div>
                `;
            }


            // Drag start

            card.addEventListener(
                "dragstart",
                () => {

                    card.classList.add(
                        "dragging"
                    );
                }
            );


            // Drag end

            card.addEventListener(
                "dragend",
                () => {

                    card.classList.remove(
                        "dragging"
                    );

                    saveOrder();
                }
            );


            // Drag over

            card.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                    const dragging =
                        document.querySelector(
                            ".dragging"
                        );


                    if (
                        !dragging
                        || dragging === card
                    ) {

                        return;
                    }


                    const box =
                        card.getBoundingClientRect();


                    const after =
                        event.clientY
                        >
                        box.top
                        +
                        box.height / 2;


                    if (after) {

                        card.parentNode.insertBefore(
                            dragging,
                            card.nextSibling
                        );

                    } else {

                        card.parentNode.insertBefore(
                            dragging,
                            card
                        );
                    }

                }
            );


            container.appendChild(
                card
            );

        }
    );
}


// =====================================================
// ADD / UPDATE NOTE
// =====================================================

async function saveNote(
    event
) {

    if (event) {

        event.preventDefault();

    }


    const title =
        noteTitle.value.trim();


    const content =
        noteContent.innerHTML.trim();


    if (
        !title
        || !content
    ) {

        showToast(
            "Title and content are required"
        );

        return;
    }


    const tags =
        noteTags.value
            .split(",")
            .map(
                tag => tag.trim()
            )
            .filter(Boolean);


    const body = {

        title,

        content,

        color:
            noteColor.value,

        tags,

        reminder:
            noteReminder.value
            || null
    };


    try {

        const url =
            editingNoteId
            ?
            `/notes/${editingNoteId}`
            :
            "/notes";


        const method =
            editingNoteId
            ?
            "PUT"
            :
            "POST";


        const response =
            await api(
                url,
                {

                    method,

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(body)
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            showToast(
                data.message
                || "Save failed"
            );

            return;
        }


        showAutoSaved();


        closeModals();


        showToast(
            editingNoteId
            ?
            "✓ Note updated"
            :
            "✓ Note added"
        );


        editingNoteId = null;


        await loadNotes();

    }

    catch (error) {

        if (
            error.message
            !== "Unauthorized"
        ) {

            showToast(
                "Could not save note"
            );
        }
    }
}


// =====================================================
// EDIT NOTE
// =====================================================

async function editNote(
    noteId
) {

    try {

        const response =
            await api(
                `/notes/${noteId}`
            );


        const note =
            await response.json();


        if (
            !response.ok
        ) {

            showToast(
                note.message
            );

            return;
        }


        if (
            note.locked
            && !unlockedNotes[noteId]
        ) {

            openUnlock(
                noteId
            );

            return;
        }


        editingNoteId =
            noteId;


        noteModalTitle.textContent =
            "✏️ Edit Note";


        saveNoteBtn.textContent =
            "✓ Update Note";


        noteTitle.value =
            note.title;


        noteContent.innerHTML =
            note.content;


        noteColor.value =
            note.color
            || "yellow";


        noteTags.value =
            (note.tags || [])
                .join(",");


        noteReminder.value =
            note.reminder
            || "";


        pdfStatus.textContent =
            note.pdf_url
            ?
            "📄 PDF attached ✓"
            :
            "";


        closeModals();

        noteModal.classList.add(
            "show"
        );

    }

    catch (error) {

        if (
            error.message
            !== "Unauthorized"
        ) {

            showToast(
                "Could not open note"
            );
        }
    }
}


// =====================================================
// DELETE / TRASH
// =====================================================

function openDelete(
    noteId
) {

    deletingNoteId =
        noteId;

    closeModals();

    deleteModal.classList.add(
        "show"
    );
}


async function confirmDelete() {

    if (
        !deletingNoteId
    ) {

        return;
    }


    await archiveNote(
        deletingNoteId,
        true
    );


    closeModals();


    showToast(
        "Note moved to Trash/Archive ↗"
    );


    deletingNoteId =
        null;
}


// =====================================================
// ARCHIVE
// =====================================================

async function archiveNote(
    noteId,
    archived
) {

    try {

        const response =
            await api(
                `/notes/${noteId}/archive`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            archived
                        })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok
        ) {

            showToast(
                data.message
            );

            return;
        }


        showToast(
            archived
            ?
            "Moved to Archive ↗"
            :
            "Note restored ↩"
        );


        await loadNotes();

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// PIN
// =====================================================

async function togglePin(
    noteId,
    pinned
) {

    try {

        const response =
            await api(
                `/notes/${noteId}/pin`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            pinned
                        })

                }
            );


        if (
            !response.ok
        ) {

            showToast(
                "Could not change pin"
            );

            return;
        }


        showToast(
            pinned
            ?
            "📌 Pinned to top"
            :
            "📍 Unpinned"
        );


        loadNotes();

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// DRAG REORDER
// =====================================================

async function saveOrder() {

    const ids =
        [
            ...document.querySelectorAll(
                ".note-card"
            )
        ]
        .map(
            card => card.dataset.id
        );


    try {

        await api(
            "/notes/reorder",
            {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        ids
                    })

            }
        );


        showToast(
            "Notes order saved ✓"
        );

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// SEARCH
// =====================================================

function searchNotes() {

    displayNotes(
        notes
    );


    const search =
        searchInput.value
            .trim();


    if (
        search
        &&
        notes.some(
            note =>
                (
                    note.title
                    +
                    " "
                    +
                    note.content
                    +
                    " "
                    +
                    (note.tags || []).join(" ")
                )
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )
    ) {

        searchInput
            .parentElement
            .classList.add(
                "match-glow"
            );

    } else {

        searchInput
            .parentElement
            .classList.remove(
                "match-glow"
            );
    }
}


// =====================================================
// VIEW
// =====================================================

function setView(
    view
) {

    currentView =
        view;

    loadNotes();
}


// =====================================================
// DARK / LIGHT MODE
// =====================================================

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "theme",
        dark
        ?
        "dark"
        :
        "light"
    );


    themeBtn.textContent =
        dark
        ?
        "☀️"
        :
        "🌙";
}


// =====================================================
// RICH TEXT
// =====================================================

function format(
    command,
    value = null
) {

    document.execCommand(
        command,
        false,
        value
    );


    noteContent.focus();
}


function changeHeading(
    value
) {

    if (!value) {

        return;
    }


    format(
        "formatBlock",
        value
    );
}


function highlightText() {

    format(
        "hiliteColor",
        "#fff176"
    );
}


function changeTextColor(
    color
) {

    format(
        "foreColor",
        color
    );
}


function createChecklist() {

    format(
        "insertUnorderedList"
    );


    showToast(
        "☑ Checklist created"
    );
}


// =====================================================
// MARKDOWN
// =====================================================

function convertMarkdown() {

    const text =
        noteContent.innerText;


    const html =
        markdownToHTML(
            text
        );


    noteContent.innerHTML =
        html;


    showToast(
        "Markdown converted ✓"
    );
}


function markdownToHTML(
    text
) {

    let html =
        escapeHTML(text);


    html =
        html.replace(
            /^### (.*)$/gm,
            "<h3>$1</h3>"
        );


    html =
        html.replace(
            /^## (.*)$/gm,
            "<h2>$1</h2>"
        );


    html =
        html.replace(
            /^# (.*)$/gm,
            "<h1>$1</h1>"
        );


    html =
        html.replace(
            /^> (.*)$/gm,
            "<blockquote>$1</blockquote>"
        );


    html =
        html.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    html =
        html.replace(
            /\*(.*?)\*/g,
            "<em>$1</em>"
        );


    html =
        html.replace(
            /`(.*?)`/g,
            "<code>$1</code>"
        );


    html =
        html.replace(
            /\n/g,
            "<br>"
        );


    return html;
}


// =====================================================
// VOICE TO NOTE
// =====================================================

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition
        ||
        window.webkitSpeechRecognition;


    if (
        !SpeechRecognition
    ) {

        showToast(
            "Voice recognition is not supported."
        );

        return;
    }


    const recognition =
        new SpeechRecognition();


    recognition.lang =
        "en-IN";


    recognition.continuous =
        false;


    recognition.interimResults =
        false;


    showToast(
        "🎤 Listening..."
    );


    recognition.onresult =
        event => {

            const text =
                event
                    .results[0][0]
                    .transcript;


            noteContent.innerText +=
                (
                    noteContent.innerText
                    ?
                    " "
                    :
                    ""
                )
                +
                text;


            showToast(
                "✓ Voice added"
            );
        };


    recognition.onerror =
        () => {

            showToast(
                "Voice input stopped"
            );
        };


    recognition.start();
}


// =====================================================
// DRAWING
// =====================================================

let canvas;

let ctx;

let drawing = false;


function setupDrawing() {

    canvas =
        document.getElementById(
            "drawCanvas"
        );


    ctx =
        canvas.getContext(
            "2d"
        );


    canvas.addEventListener(
        "pointerdown",
        event => {

            drawing =
                true;

            const [
                x,
                y
            ] =
                canvasPoint(
                    event
                );


            ctx.beginPath();

            ctx.moveTo(
                x,
                y
            );
        }
    );


    canvas.addEventListener(
        "pointermove",
        event => {

            if (
                !drawing
            ) {

                return;
            }


            const [
                x,
                y
            ] =
                canvasPoint(
                    event
                );


            ctx.lineTo(
                x,
                y
            );


            ctx.strokeStyle =
                "#30271f";

            ctx.lineWidth =
                3;

            ctx.lineCap =
                "round";


            ctx.stroke();
        }
    );


    canvas.addEventListener(
        "pointerup",
        () => {

            drawing =
                false;
        }
    );


    canvas.addEventListener(
        "pointerleave",
        () => {

            drawing =
                false;
        }
    );
}


function canvasPoint(
    event
) {

    const rect =
        canvas.getBoundingClientRect();


    return [

        (
            event.clientX
            -
            rect.left
        )
        *
        canvas.width
        /
        rect.width,


        (
            event.clientY
            -
            rect.top
        )
        *
        canvas.height
        /
        rect.height

    ];
}


function openDrawing() {

    drawModal.classList.add(
        "show"
    );
}


function clearCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}


function insertDrawing() {

    const image =
        canvas.toDataURL(
            "image/png"
        );


    noteContent.focus();


    document.execCommand(
        "insertHTML",
        false,
        `<p>
            <img
                src="${image}"
                style="
                    max-width:100%;
                    border-radius:10px;
                "
            >
        </p>`
    );


    closeModals();


    showToast(
        "🎨 Drawing inserted"
    );
}


// =====================================================
// LOCK NOTE
// =====================================================

async function lockCurrentNote() {

    if (
        !editingNoteId
    ) {

        showToast(
            "Save the note first."
        );

        return;
    }


    const password =
        prompt(
            "Create note password (minimum 4 characters):"
        );


    if (
        !password
        ||
        password.length < 4
    ) {

        showToast(
            "Password must contain at least 4 characters"
        );

        return;
    }


    try {

        const response =
            await api(
                `/notes/${editingNoteId}/lock`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            password
                        })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok
        ) {

            showToast(
                data.message
            );

            return;
        }


        closeModals();

        showToast(
            "🔒 Note locked"
        );


        loadNotes();

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// UNLOCK
// =====================================================

function openUnlock(
    noteId
) {

    deletingNoteId =
        noteId;


    unlockPassword.value =
        "";


    closeModals();


    unlockModal.classList.add(
        "show"
    );
}


async function unlockNote() {

    const noteId =
        deletingNoteId;


    const password =
        unlockPassword.value;


    try {

        const response =
            await api(
                `/notes/${noteId}/unlock`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            password
                        })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok
        ) {

            showToast(
                data.message
                ||
                "Incorrect password"
            );

            return;
        }


        unlockedNotes[noteId] =
            true;


        closeModals();


        showToast(
            "🔓 Note unlocked"
        );


        displayNotes(
            notes
        );

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// PDF UPLOAD
// =====================================================

async function uploadPDF() {

    if (
        !editingNoteId
    ) {

        pdfStatus.textContent =
            "Save the note first, then upload the PDF.";

        return;
    }


    const file =
        pdfInput.files[0];


    if (!file) {

        return;
    }


    if (
        file.type
        !==
        "application/pdf"
    ) {

        showToast(
            "Only PDF files are allowed."
        );

        return;
    }


    const formData =
        new FormData();


    formData.append(
        "file",
        file
    );


    try {

        const response =
            await api(
                `/notes/${editingNoteId}/upload-pdf`,
                {

                    method: "POST",

                    body:
                        formData

                }
            );


        const data =
            await response.json();


        if (
            !response.ok
        ) {

            pdfStatus.textContent =
                data.message;

            return;
        }


        pdfStatus.textContent =
            "📄 PDF uploaded successfully ✓";


        showToast(
            "PDF uploaded ✓"
        );


        loadNotes();

    }

    catch (error) {

        console.error(error);
    }
}


// =====================================================
// REMINDER
// =====================================================

function scheduleReminders() {

    notes.forEach(
        note => {

            if (
                !note.reminder
            ) {

                return;
            }


            const time =
                new Date(
                    note.reminder
                ).getTime();


            const delay =
                time - Date.now();


            if (
                delay > 0
                &&
                delay < 2147483647
            ) {

                if (
                    reminderTimers[note.id]
                ) {

                    clearTimeout(
                        reminderTimers[note.id]
                    );
                }


                reminderTimers[note.id] =
                    setTimeout(
                        () => {

                            showReminder(
                                note.title
                            );

                        },
                        delay
                    );
            }

        }
    );
}


function showReminder(
    title
) {

    showToast(
        `⏰ Reminder: ${title}`
    );


    if (
        "Notification"
        in window
    ) {

        if (
            Notification.permission
            ===
            "granted"
        ) {

            new Notification(
                "Smart Notes Reminder",
                {
                    body:
                        title
                }
            );

        }

    }
}


// =====================================================
// AUTO SAVE EFFECT
// =====================================================

let autoSaveTimer;


function autoSaveIndicator() {

    autoSave.textContent =
        "● Changes detected...";


    clearTimeout(
        autoSaveTimer
    );


    autoSaveTimer =
        setTimeout(
            () => {

                autoSave.textContent =
                    "✓ Auto-save ready";


                autoSave.classList.add(
                    "saved"
                );


                setTimeout(
                    () => {

                        autoSave.classList.remove(
                            "saved"
                        );

                    },
                    500
                );

            },
            700
        );
}


function showAutoSaved() {

    autoSave.textContent =
        "✓ Saved successfully";


    autoSave.classList.add(
        "saved"
    );


    setTimeout(
        () => {

            autoSave.classList.remove(
                "saved"
            );

        },
        600
    );
}


// =====================================================
// TOAST
// =====================================================

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );
}


// =====================================================
// SECURITY
// =====================================================

function escapeHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;
}


// =====================================================
// DATE
// =====================================================

function formatDate(
    dateString
) {

    if (
        !dateString
    ) {

        return "";
    }


    const date =
        new Date(
            dateString
        );


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "";
    }


    return date.toLocaleString(
        "en-IN",
        {
            dateStyle:
                "medium",

            timeStyle:
                "short"
        }
    );
}