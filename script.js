// ========================================
// DATE WITH HANSHIKA ❤️
// ========================================

const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noAttempts = 0;

const messages = [
    "Are you sure, Hanshika? 🥺❤️",
    "Think again! 😭💕",
    "Nice try 😏",
    "You can't escape! 😂❤️",
    "Come on... say YES! 🥰",
    "Wrong button! 🤭",
    "I know you want to say YES 😌❤️",
    "NO is not an option 😂",
    "Hanshika... seriously? 😭❤️"
];

let messageIndex = 0;


// ========================================
// NO BUTTON
// ========================================

function moveNoButton() {

    noAttempts++;

    noBtn.style.position = "fixed";

    const x =
        Math.random() *
        (window.innerWidth - noBtn.offsetWidth - 20);

    const y =
        Math.random() *
        (window.innerHeight - noBtn.offsetHeight - 20);

    noBtn.style.left = Math.max(10, x) + "px";
    noBtn.style.top = Math.max(10, y) + "px";


    message.innerText =
        messages[messageIndex];

    messageIndex++;

    if (messageIndex >= messages.length) {
        messageIndex = 0;
    }
}


// Desktop
noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


// Mobile
noBtn.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);


// ========================================
// YES BUTTON → PAGE 2
// ========================================

function sayYes() {

    document.getElementById("page1").style.display =
        "none";

    document.getElementById("page2").style.display =
        "block";
}


// ========================================
// ACTIVITIES
// ========================================

let selectedActivities = [];


function selectActivity(button) {

    const activityName =
        button.querySelector("span").innerText;


    if (button.classList.contains("selected")) {

        button.classList.remove("selected");

        selectedActivities =
            selectedActivities.filter(
                activity => activity !== activityName
            );

    } else {

        button.classList.add("selected");

        selectedActivities.push(
            activityName
        );
    }


    const activityMessage =
        document.getElementById("activityMessage");


    if (selectedActivities.length === 0) {

        activityMessage.innerText =
            "Pick something... or pick everything 😌❤️";

    } else {

        activityMessage.innerText =
            "Our plan: " +
            selectedActivities.join(", ") +
            " ❤️";
    }
}


// ========================================
// PAGE 2 → PAGE 3
// ========================================

function goToPage3() {

    if (selectedActivities.length === 0) {

        document.getElementById(
            "activityMessage"
        ).innerText =
            "Hey! Choose at least one 😏❤️";

        return;
    }


    document.getElementById("page2").style.display =
        "none";

    document.getElementById("page3").style.display =
        "block";
}


// ========================================
// PAGE 3 → FINAL PAGE
// ========================================

async function showFinalPage() {

    const date =
        document.getElementById("dateInput").value;

    const time =
        document.getElementById("timeInput").value;


    if (!date || !time) {

        document.getElementById(
            "dateMessage"
        ).innerText =
            "You forgot to choose the date and time! 🥺❤️";

        return;
    }


    // ========================================
    // FORMAT DATE
    // ========================================

    const dateObject =
        new Date(date + "T00:00:00");


    const formattedDate =
        dateObject.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // ========================================
    // FORMAT TIME
    // ========================================

    const [
        hours,
        minutes
    ] = time.split(":");


    const timeObject =
        new Date();

    timeObject.setHours(hours);
    timeObject.setMinutes(minutes);


    const formattedTime =
        timeObject.toLocaleTimeString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }
        );


    // ========================================
    // FORMSPREE FORM SUBMISSION ❤️
    // ========================================

    const formData = new FormData();

    formData.append(
        "Name",
        "Hanshika"
    );

    formData.append(
        "No Button Attempts",
        noAttempts
    );

    formData.append(
        "Activities",
        selectedActivities.join(", ")
    );

    formData.append(
        "Date",
        formattedDate
    );

    formData.append(
        "Time",
        formattedTime
    );


    try {

        const response = await fetch(
            "https://formspree.io/f/xbgjdrpb",
            {
                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        if (response.ok) {

            console.log(
                "❤️ Formspree response sent successfully!"
            );

        } else {

            console.error(
                "❌ Formspree submission failed:",
                response.status
            );

        }

    } catch (error) {

        console.error(
            "❌ Formspree error:",
            error
        );

    }


    // ========================================
    // SHOW FINAL PAGE
    // ========================================

    document.getElementById(
        "finalDate"
    ).innerText =
        formattedDate;


    document.getElementById(
        "finalTime"
    ).innerText =
        formattedTime;


    document.getElementById(
        "finalActivities"
    ).innerText =
        selectedActivities.join(" + ");


    document.getElementById(
        "page3"
    ).style.display =
        "none";


    document.getElementById(
        "finalPage"
    ).style.display =
        "block";


    // Celebration 🎉
    createConfetti();
}


// ========================================
// REMINDER
// ========================================

function setReminder() {

    const date =
        document.getElementById(
            "dateInput"
        ).value;

    const time =
        document.getElementById(
            "timeInput"
        ).value;


    if (!date || !time) {

        document.getElementById(
            "dateMessage"
        ).innerText =
            "Choose a date and time first! ❤️";

        return;
    }


    const activities =
        selectedActivities.join(" + ");


    const startDate =
        new Date(
            date + "T" + time
        );


    const endDate =
        new Date(
            startDate.getTime() +
            60 * 60 * 1000
        );


    function calendarDate(date) {

        return (
            date.getFullYear() +
            String(
                date.getMonth() + 1
            ).padStart(2, "0") +
            String(
                date.getDate()
            ).padStart(2, "0") +
            "T" +
            String(
                date.getHours()
            ).padStart(2, "0") +
            String(
                date.getMinutes()
            ).padStart(2, "0") +
            "00"
        );
    }


    const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${calendarDate(startDate)}
DTEND:${calendarDate(endDate)}
SUMMARY:Date with Aman ❤️
DESCRIPTION:${activities}
END:VEVENT
END:VCALENDAR`;


    const blob =
        new Blob(
            [icsContent],
            {
                type: "text/calendar"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "date-with-aman.ics";

    link.click();


    URL.revokeObjectURL(url);


    const reminderMessage =
        document.getElementById(
            "reminderMessage"
        );


    if (reminderMessage) {

        reminderMessage.innerText =
            "💕 Reminder created! See you on our date!";
    }
}


// ========================================
// CONFETTI 🎉
// ========================================

function createConfetti() {

    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const confetti =
            document.createElement("div");


        const emojis = [
            "❤️",
            "💕",
            "💖",
            "✨",
            "🎉"
        ];


        confetti.innerText =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        confetti.style.position =
            "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top =
            "-30px";

        confetti.style.fontSize =
            (
                15 +
                Math.random() * 20
            ) + "px";

        confetti.style.zIndex =
            "1000";

        confetti.style.pointerEvents =
            "none";

        confetti.style.animation =
            `confettiFall ${
                2 +
                Math.random() * 3
            }s linear forwards`;


        document.body.appendChild(
            confetti
        );


        setTimeout(
            () => confetti.remove(),
            5000
        );
    }
}