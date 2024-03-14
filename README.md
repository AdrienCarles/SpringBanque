###Mise en Place du projet sous intel Ij ###

Étape 1 : Cloner le dépôt
Ouvrez GitHub et naviguez jusqu'au dépôt que vous souhaitez cloner.
Copiez l'URL de clonage du dépôt. Vous trouverez l'URL dans le bouton "Code" situé en haut à droite de la liste des fichiers du dépôt. Assurez-vous de copier l'URL HTTPS ou SSH selon votre configuration.

Étape 2 : Ouvrir IntelliJ IDEA
Lancez IntelliJ IDEA sur l'autre PC.
Sur l'écran d'accueil, choisissez "Get from VCS" (Version Control System) si vous créez un nouveau projet à partir du dépôt cloné. Si IntelliJ est déjà ouvert, vous pouvez trouver cette option dans File > New > Project from Version Control...

Étape 3 : Cloner le dépôt dans IntelliJ IDEA
Dans la boîte de dialogue "Get from Version Control", collez l'URL du dépôt que vous avez copiée à partir de GitHub dans le champ "URL".
Sélectionnez le dossier local où vous souhaitez cloner le dépôt dans le champ "Directory".
Cliquez sur "Clone".

Étape 4 : Ouvrir le projet
Après le clonage, IntelliJ IDEA devrait automatiquement proposer d'ouvrir le projet. Si ce n'est pas le cas, naviguez jusqu'au dossier du projet cloné et ouvrez-le manuellement via File > Open dans IntelliJ IDEA.

Étape 5 : Configurer le projet
Si le projet utilise Gradle ou Maven, IntelliJ devrait automatiquement détecter le fichier de configuration (build.gradle pour Gradle ou pom.xml pour Maven) et vous proposer d'importer le projet. Suivez les instructions à l'écran pour importer le projet en tant que projet Gradle ou Maven.
Assurez-vous que JDK est correctement configuré pour le projet. Vous pouvez le vérifier et le configurer dans File > Project Structure > Project.

Étape 6 : Lancer l'application
Trouvez la classe principale de votre application Spring Boot, celle annotée avec @SpringBootApplication.
Cliquez droit sur le fichier et choisissez Run 'NomDeVotreClasseApplication' pour démarrer l'application.

Étape 7 : Vérifier que l'application fonctionne
Ouvrez un navigateur web et naviguez jusqu'à http://localhost:8080 ou l'adresse configurée pour votre application Spring Boot pour vérifier qu'elle s'exécute correctement.
