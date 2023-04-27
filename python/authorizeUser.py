from dataclasses import dataclass
from enum import Enum
import os


class AccessLevels(Enum):
    USER = 0  # Can read
    ADMIN = 1  # Can read and write
    GUEST = 2  # Can neither read nor write


@dataclass
class User(object):
    id: str
    access: AccessLevels

    '''
    Error string template for copy/paste:
    Access denied for: {user.access.name}
    '''


class AccessDeniedError(Exception):
    def __init__(self, user: User):
        self.user = user
        super().__init__(f"Access denied for: {user.access.name}")


def authorize(access: set[AccessLevels]):
    def decorator(func):
        def wrapper(*args, **kwargs):
            user = kwargs["user"]
            if user.access not in access:
                raise AccessDeniedError(user)
            return func(*args, **kwargs)
        return wrapper
    return decorator


class DatabaseController(object):
    def __init__(self, data: dict) -> None:
        self.data = data

    @authorize({AccessLevels.ADMIN, AccessLevels.USER})
    def get_data(self, key: str, user: User) -> str:
        return f"Success: {self.data.get(key, 'NotFound')}"

    @authorize({AccessLevels.ADMIN})
    def set_data(self, key: str, val: str, user: User) -> str:
        self.data[key] = val
        return f"Success: {key}: {val} saved"


def read_seed_data() -> dict[str, str]:
    n = int(input())
    seed_data = {}
    for i in range(n):
        k, v = input().strip().split(",")
        seed_data.update({k: v})
    return seed_data


def read_users() -> list[User]:
    access_mapper = {0: AccessLevels.USER, 1: AccessLevels.ADMIN, 2: AccessLevels.GUEST}
    n = int(input())
    users = []
    for i in range(n):
        id, access = input().strip().split()
        access = int(access)
        user = User(id, access_mapper[access])
        users.append(user)
    return users


def run_instructions(users: list[User], data_controller: DatabaseController) -> None:
    functions_mapper = {
        "get": data_controller.get_data,
        "set": data_controller.set_data,
    }
    instruction_count = int(input())
    for i in range(instruction_count):
        instruction, user_id, *inp = input().strip().split()
        user_id = int(user_id)
        try:
            res = functions_mapper[instruction](*inp, user=users[user_id])
        except AccessDeniedError as ade:
            print(ade)
        else:
            print(res)


def main(path="/dev/stdout") -> None:
    seed_data = read_seed_data()

    users = read_users()

    data_controller = DatabaseController(seed_data)
    run_instructions(users, data_controller)


if __name__ == "__main__":
    path = "/dev/stdout"
    if "OUTPUT_PATH" in os.environ.keys():
        path = os.environ["OUTPUT_PATH"]
    main(path=path)
