var CreepsWay = require('Creeps.way');
var roleCarrier = {
    run: function(creep,id){




        if(creep.store[RESOURCE_ENERGY]==0){
            CreepsWay.WithdrawFromStorage(creep);
        }
        else{
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                filter:(structure) =>{
                    return(
                        (structure.structureType == STRUCTURE_EXTENSION
                        || structure.structureType == STRUCTURE_SPAWN
                        // || structure.structureType == STRUCTURE_TOWER
                        )
                        &&structure.store.getFreeCapacity(RESOURCE_ENERGY)>0
                    )
                }
            })
            if(!target){
                target = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                    filter:(structure)=>{
                        return (structure.structureType == STRUCTURE_TOWER)
                            &&structure.store.getFreeCapacity(RESOURCE_ENERGY)>0
                    }
                })
            }
            CreepsWay.TransferTarget(creep,target);
        }
    }
}

module.exports = roleCarrier;