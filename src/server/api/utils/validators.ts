import { t } from 'elysia'

export function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function StringField(errorMsg: string, required = true) {
  return required
    ? t.String({
      error() {
        return errorMsg
      },
    })
    : t.Optional(
      t.String({
        error() {
          return errorMsg
        },
      }),
    )
}

export function UnionField(fields: string[], errorMsg: string, required = true) {
  return required
    ? t.Union(
      fields.map((field) => t.Literal(field)),
      {
        error() {
          return errorMsg
        },
      },
    )
    : t.Optional(
      t.Union(
        fields.map((field) => t.Literal(field)),
        {
          error() {
            return errorMsg
          },
        },
      ),
    )
}
