echo "------------------------stopping containers--------------------------"
container=`docker ps -a -q`
# echo "$container"
# echo `docker stop $container`
docker stop $(docker ps -a -q)
echo "--------------------------deleting containers--------------------------"
# echo "docker rm $container"
docker rm $(docker ps -a -q)

echo "--------------------------start clearing image--------------------------"
dockerlist=`docker images`
echo "$dockerlist"
docker rmi $(docker images -q)
echo "--------------------------clear images completed--------------------------"

echo "--------------------------pull remote koa image--------------------------"
docker pull asd285653184/koa
echo "--------------------------start container--------------------------"
docker run -d -t -p 3030:3030 asd285653184/koa npm run start-t
echo `docker ps`
echo "--------------------------ending--------------------------"