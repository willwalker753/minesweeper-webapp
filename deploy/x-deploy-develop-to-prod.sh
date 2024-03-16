startPath="$PWD"
scriptPath="$(dirname "${BASH_SOURCE[0]}")"
workPath=$scriptPath/..

cd $workPath

# this webapp uses branches to differentiate between dev and prod
# cloudflare CI/CD is configured to auto deploy those branches

git checkout develop
git pull origin develop

git checkout prod
git pull origin prod
git merge develop
git push origin prod

cd $startPath