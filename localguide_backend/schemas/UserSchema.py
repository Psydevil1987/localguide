from schemas.base.BaseSchema import BaseSchema

class UserSchema(BaseSchema):
   id : int | None = None
   idp_uid : str | None = None
   surename : str | None = None
   givenname : str| None = None
   is_guide : bool| None = None
   city : str | None = None
   about : str | None = None
   picture : str | None = None
   age : str | None = None
   hobbies : str | None = None
   is_verified : bool| None = None