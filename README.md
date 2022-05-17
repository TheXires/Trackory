# Kalorienzähler[^1]

Der Kalorienzähler erlaubt es den Nutzern, ihre Kalorienzufuhr zu protokollieren und kontrollieren. Ein Fortschrittsbalken auf der Startseite zeigt an, wie viele Kalorien bis zu dem in den Einstellungen festgelegten Kalorienziel aufgenommen werden können. Neben Kalorien können auch Fette, Kohlenhydrate und Proteine erfasst werden. Einmal erstellte Speisen und Getränke, werden gespeichert und können anschließend immer wieder verwendet werden. Außerdem ist es den Nutzern möglich zu diesen ein Bild hinzuzufügen, um sie leichter wiedererkennen zu können. Die erfassten Daten können übersichtlich in einer Statistik angesehen werden, welche ebenfalls die Möglichkeit bietet, das vom Nutzer in den Einstellungen eingetragene Gewicht zu visualisieren und über einen längeren Zeitraum als Graph darzustellen.

## Wireframes

Während der Entwicklung dieser App wurden die Schritte des Software Development Life Cycles nacheinander durchlaufen. Dazu gehört auch das Erstellen von Wireframes und/oder eines Prototyps. Da dies ein effizienteres Erstellen und Ausprobieren unterschiedlicher Designs erlaubt und so den Entwicklungsprozess vereinfacht und optimiert.

![Wireframes](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fwireframes.jpg&w=828&q=75)


## Frontend

Der Kalorienzähler erlaubt es den Nutzern, ihre Kalorienzufuhr zu protokollieren und kontrollieren. Ein Fortschrittsbalken auf der Startseite zeigt an, wie viele Kalorien bis zu dem in den Einstellungen festgelegten Kalorienziel aufgenommen werden können. Neben Kalorien können auch Fette, Kohlenhydrate und Proteine erfasst werden. Einmal erstellte Speisen und Getränke, werden gespeichert und können anschließend immer wieder verwendet werden. Außerdem ist es den Nutzern möglich zu diesen ein Bild hinzuzufügen, um sie leichter wiedererkennen zu können. Die erfassten Daten können übersichtlich in einer Statistik angesehen werden, welche ebenfalls die Möglichkeit bietet, das vom Nutzer in den Einstellungen eingetragene Gewicht zu visualisieren und über einen längeren Zeitraum als Graph darzustellen.

![Screenshot 1](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage1.jpg&w=256&q=75)
![Screenshot 2](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage2.jpg&w=256&q=75)
![Screenshot 3](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage3.jpg&w=256&q=75)
![Screenshot 4](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage4.jpg&w=256&q=75)
![Screenshot 5](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage5.jpg&w=256&q=75)
![Screenshot 6](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage6.jpg&w=256&q=75)
![Screenshot 7](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage7.jpg&w=256&q=75)
![Screenshot 8](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage8.jpg&w=256&q=75)
![Screenshot 9](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage9.jpg&w=256&q=75)
![Screenshot 10](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage10.jpg&w=256&q=75)
![Screenshot 11](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage11.jpg&w=256&q=75)
![Screenshot 12](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage12.jpg&w=256&q=75)
![Screenshot 13](https://robin-beckmann.de/_next/image?url=%2Fimages%2Fprojects%2Fcaloriecounter%2Fimage13.jpg&w=256&q=75)

## Backend

Für das Backend wurde auf eine serverless Lösung von Google in Form von Firebase gesetzt. Konkret wurden dabei vier konkrete Firebase Dienste verwendet. Authentication für die Nutzer- und Rechteverwaltung, sodass Nutzer sich registrieren und einloggen können und sichergestellt wird, dass jeder Nutzer nur Zugriff auf die eigenen Daten hat. Für das strukturierte Speichern von Informationen und Daten wurde auf die dokumentenbasierte Datenbank Cloud Firebase gesetzt. Um das Hochladen und Anzeigen von Bildern in der App zu ermöglichen, wird der Cloud Storage genutzt. Um darüber hinaus weitere Funktionalitäten zu ermöglichen, wurden einige Cloud Functions hinzugefügt, die beispielsweise das Erstellen der Statistiken und Löschen von Benutzerkonten ermöglichen.

Der Code für das Backend befindet sich dabei im Repository [eas-calorie-counter-cloud-functions](https://github.com/TheXires/eas-calorie-counter-cloud-functions)

[^1]: Diese Projekt wurde vorher in einem anderen Repository entwickelt und ist dann hierher umgezogen. Das erste Repository ist allerdings nicht öffentlich einsehbar. 