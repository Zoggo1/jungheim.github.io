const SUPABASE_URL = 'https://hlcapqbkwfxlvrdedhsn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_hhaNeuG7r1pV7U-A4djxuQ_p55N_-hJ';
let client = null;

document.addEventListener("DOMContentLoaded", () => {
    if (typeof supabase !== 'undefined') {
        client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    }

    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        handleLogin();
    });
});

async function resolveEmail(identifier) {
    if (identifier.includes('@')) {
        return identifier;
    }

    if (!client) {
        return null;
    }

    const { data, error } = await client
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .maybeSingle();

    if (error || !data?.email) {
        return null;
    }

    return data.email;
}

async function handleLogin() {
    const msgDiv = document.getElementById('message');
    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value;

    msgDiv.style.display = 'block';
    msgDiv.className = '';
    msgDiv.innerText = 'Prüfe Zugangsdaten...';

    if (!identifier || !password) {
        msgDiv.innerText = 'Bitte gib Benutzername/E-Mail und Passwort ein.';
        msgDiv.className = 'error';
        return;
    }

    if (!client) {
        msgDiv.innerText = 'Fehler: Supabase konnte nicht geladen werden. Bitte Seite neu laden.';
        msgDiv.className = 'error';
        return;
    }

    let email = identifier;
    if (!identifier.includes('@')) {
        msgDiv.innerText = 'Suche Benutzername...';
        const resolvedEmail = await resolveEmail(identifier);
        if (!resolvedEmail) {
            msgDiv.innerText = 'Benutzername nicht gefunden. Bitte nutze E-Mail oder registriere dich zuerst.';
            msgDiv.className = 'error';
            return;
        }
        email = resolvedEmail;
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
            msgDiv.innerText = 'Erfolgreich eingeloggt! Weiterleitung zum Forum...';
            msgDiv.className = 'success';
            setTimeout(() => {
                window.location.href = 'forum.html';
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
