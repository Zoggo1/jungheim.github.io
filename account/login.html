const SUPABASE_URL = 'https://hlcapqbkwfxlvrdedhsn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_hhaNeuG7r1pV7U-A4djxuQ_p55N_-hJ';
let client = null;

document.addEventListener("DOMContentLoaded", () => {
    if (typeof supabase !== 'undefined') {
        client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    const loginForm = document.getElementById("login-form");
    const submitBtn = document.getElementById("submitBtn");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        handleLogin();
    });
});

async function handleLogin() {
    const msgDiv = document.getElementById('message');
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    msgDiv.style.display = 'block';
    msgDiv.className = '';
    msgDiv.innerText = 'Prüfe Zugangsdaten...';

    if (!email || !password) {
        msgDiv.innerText = 'Bitte gib E-Mail und Passwort ein.';
        msgDiv.className = 'error';
        return;
    }

    if (!client) {
        msgDiv.innerText = 'Fehler: Supabase konnte nicht geladen werden. Bitte Seite neu laden.';
        msgDiv.className = 'error';
        return;
    }

    try {
        const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            msgDiv.innerText = 'Error: ' + error.message;
            msgDiv.className = 'error';
            return;
        }

        if (data.user) {
            msgDiv.innerText = 'Erfolgreich eingeloggt! Weiterleitung...';
            msgDiv.className = 'success';
            setTimeout(() => {
                window.location.href = 'settings.html';
            }, 1500);
        } else {
            msgDiv.innerText = 'Anmeldung fehlgeschlagen. Bitte überprüfe deine Daten.';
            msgDiv.className = 'error';
        }
    } catch (err) {
        msgDiv.innerText = 'Kritischer Fehler: ' + err.message;
        msgDiv.className = 'error';
    }
}
