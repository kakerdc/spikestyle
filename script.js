const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI4NDg1ZDIzLTU5OTgtNDJlNC1iMTkyLTg1MmE5OGQ5MGQxYSIsImlhdCI6MTczMTIzOTk5OCwic3ViIjoiZGV2ZWxvcGVyLzIxMDcwNjZkLTExYzMtMWZiYi0xYWI2LTQ3NzQ2ZDhkMDg3YSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzguMzAuNzMuOTYiXSwidHlwZSI6ImNsaWVudCJ9XX0.fbcsPa0_t6mIujCz3GuMlsfl2pD93aM4vtK_6_DpAq4WA3a8V0qNDF8w7jlJmsZD2pkqMSpw5WqS2oaJb6En8w';

async function getPlayerInfo() {
    const playerId = document.getElementById("playerId").value.trim();
    
    if (!playerId) {
        alert("Wprowadź ID gracza!");
        return;
    }

    let formattedPlayerId = playerId.replace("#", "%23");
    const url = `https://api.brawlstars.com/v1/players/${formattedPlayerId}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }

        const data = await response.json();
        displayPlayerInfo(data);
    } catch (error) {
        alert("Nie udało się pobrać danych. Sprawdź, czy ID gracza jest poprawne.");
    }
}

function displayPlayerInfo(data) {
    const playerName = data.name || "Nieznany";
    const trophies = data.trophies || 0;
    const masteryPoints = data.expPoints || 0;

    document.getElementById("playerName").innerText = `Nick: ${playerName}`;
    document.getElementById("trophies").innerText = `Trophies: ${trophies}`;
    document.getElementById("masteryPoints").innerText = `Mastery Points: ${masteryPoints}`;

    document.getElementById("resultSection").style.display = "block";
}