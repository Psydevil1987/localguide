Install-Module -Name SqlServer

# Basis-URL der Website
$url = "https://thispersondoesnotexist.com"



$CSV = Import-Csv "C:\Users\litau\OneDrive - BildungsCentrum der Wirtschaft gemeinnützige Gesellschaft mbH\Semester 6 - Anwendungsprojekt\localguide_tools\dummy_data_5000_new.csv" -Delimiter ";"
foreach($dataset in $CSV){



write $dataset.Vorname

$respone = Invoke-WebRequest "https://this-person-does-not-exist.com/new?time=1718441788678&gender=$($dataset.Geschlecht.ToLower())&age=$($dataset.Alterspanne)&etnic=all"
$json =  ConvertFrom-Json $respone.Content


$tempFile = "C:\temp\bild.jpg";
Invoke-WebRequest -Uri "https://this-person-does-not-exist.com$($json.src)" -OutFile $tempFile
$base64String = [Convert]::ToBase64String([IO.File]::ReadAllBytes($tempFile))

$Bild = "data:image/jpeg;base64,$($base64String)"



$Befehl = "INSERT INTO [dbo].[USER]
           ([ID]
           ,[IDP_UID]
           ,[IS_GUIDE]
           ,[SURENAME]
           ,[GIVENNAME]
           ,[CITY]
           ,[ABOUT]
           ,[PICTURE]
           ,[AGE]
           ,[HOBBIES]
           ,[IS_VERIFIED])
     VALUES
           (NEXT VALUE FOR SEQ_USER
           ,`'$(Get-Random )`'
           ,1
           ,`'$($dataset.Vorname)`'
           ,`'$($dataset.Nachname)`'
           ,`'$($dataset.Stadt)`'
           ,`'$($dataset.Erklärung)`'
           ,`'$Bild`'
           ,`'$($dataset.Alter)`'
           ,`'$($dataset.Hobbys)`'
           ,1)
"

Invoke-Sqlcmd -ServerInstance *** -Database *** -Username *** -Password *** -Query $Befehl



}