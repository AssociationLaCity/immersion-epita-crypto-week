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
        self.sender = sender
        self.receiver = receiver
        self.amount = amount
        self.date = datetime.datetime.now().timestamp()
        self.hash = hashlib.sha256(f"{sender}{receiver}{amount}{self.date}".encode()).hexdigest()
    def save(self, blockHash):
        self.blockHash = blockHash
        with open('./blockchainscan/src/transactions.json', 'r') as openfile:
            json_object = json.load(openfile)
        json_object.append(self.__dict__)
        with open("./blockchainscan/src/transactions.json", "w") as outfile:
            json.dump(json_object, outfile)

class Block:
    def __init__(self, previous_block_hash, transaction_list):

        self.previous_block_hash = previous_block_hash
        self.transaction_list = transaction_list

        self.block_data = f"{' - '.join(map(lambda x: x.hash, transaction_list))} - {previous_block_hash}"
        self.block_hash = hashlib.sha256(self.block_data.encode()).hexdigest()
        for tx in transaction_list:
            tx.save(self.block_hash)
        self.date = datetime.datetime.now().timestamp()
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
        self.chain.append(Block("0", []))
        print(self.chain[0].block_data)
    
    def create_block_from_transactions(self, transaction_list):
        previous_block_hash = self.last_block.block_hash
        self.chain.append(Block(previous_block_hash, transaction_list))

    def display_chain(self):
        for i in range(len(self.chain)):
            print(f"Data {i + 1}: {self.chain[i].block_data}")
            print(f"Hash {i + 1}: {self.chain[i].block_hash}\n")

    @property
    def last_block(self):
        return self.chain[-1]

resetBlocks()
resetTransactions()

t1 = Transaction('George', 'Joe', 3.1)
t2 = Transaction('Joe', 'Adam', 2.5)
t3 = Transaction('Adam', 'Bob', 1.2)
t4 = Transaction('Bob', 'Charlie', 0.5)
t5 = Transaction('Charlie', 'David', 0.2)
t6 = Transaction('David', 'Eric', 0.1)

myblockchain = Blockchain()

myblockchain.create_block_from_transactions([t1, t2])
myblockchain.create_block_from_transactions([t3, t4])
myblockchain.create_block_from_transactions([t5, t6])

myblockchain.display_chain()