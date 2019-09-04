from enum import Enum
from enum import IntEnum, unique

@unique
class VIP(IntEnum):
    yellow = 1
    # yellow_alias = 1
    green = 2
    black = 3

for v in VIP:
  print(v)