import hashlib
import datetime
import json

def resetTransactions():
    with open('./blockchainscan/src/transactions.json', 'w') as outfile:
        outfile.write('[]')
        outfile.close()

def resetBlocks():
    with open('./blockchainscan/src/blocks.json', 'w') as outfile:
        outfile.write('[]')
        outfile.close()

class Transaction:
    def __init__(self, sender, receiver, amount):
        # your code here
        pass
    def save(self, blockHash):
        self.blockHash = blockHash
        with open('./blockchainscan/src/transactions.json', 'r') as openfile:
            json_object = json.load(openfile)
        json_object.append(self.__dict__)
        with open("./blockchainscan/src/transactions.json", "w") as outfile:
            json.dump(json_object, outfile)


class Block:
    def __init__(self, previous_block_hash, transaction_list):
        self.block_data = f"{' - '.join(map(lambda x: x.hash, transaction_list))} - {previous_block_hash}"
        # your code here

        
        with open('./blockchainscan/src/blocks.json', 'r') as openfile:
            json_object = json.load(openfile)
        dict = {
            "hash": self.block_hash,
            "previous_block": self.previous_block_hash,
            "transactions": list(map(lambda x: x.__dict__, self.transaction_list)),
            "date": self.date
        }
        json_object.append(dict)
        with open("./blockchainscan/src/blocks.json", "w") as outfile:
            json.dump(json_object, outfile)

class Blockchain:
    def __init__(self):
        self.chain = []
        self.generate_genesis_block()

    def generate_genesis_block(self):
        # your code here
        pass
    
    def create_block_from_transactions(self, transaction_list):
        # your code here
        pass

    def display_chain(self):
        for i in range(len(self.chain)):
            print(f"Data {i + 1}: {self.chain[i].block_data}")
            print(f"Hash {i + 1}: {self.chain[i].block_hash}\n")

    @property
    def last_block(self):
        return self.chain[-1]

resetBlocks()
resetTransactions()

myblockchain = Blockchain()